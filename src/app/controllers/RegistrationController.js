import * as Yup from 'yup';
import { addMonths, isBefore, startOfHour, parseISO, format } from 'date-fns';
import { en } from 'date-fns/locale';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Registration from '../models/Registration';
import Notification from '../schema/Notification';

import Mail from '../../lib/Mail';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll();
    return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Insuficient required data to create new registration',
      });
    }

    const { student_id, plan_id, start_date } = req.body;
    const hourStart = startOfHour(parseISO(start_date));
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({
        error: 'Can not go to the past to perform a new registration',
      });
    }

    const isStudent = await Student.findByPk(student_id);
    if (!isStudent) {
      return res.status(400).json({
        error: 'Student do not exists',
      });
    }

    const validPlan = await Plan.findByPk(plan_id);
    if (!validPlan) {
      return res.status(400).json({
        error: 'Plan do not exists',
      });
    }

    const end_date = addMonths(parseISO(start_date), validPlan.duration);
    const price = validPlan.effective_price;

    await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    const formattedDate = format(hourStart, "MMMM dd', at' H:mm'h'", {
      locale: en,
    });

    await Notification.create({
      content: `New registration done to ${isStudent.name} to start ${formattedDate}`,
      /**
       * User Id that cames in JWT token. Its the administrator of the system
       */
      user: req.userId,
    });

    await Mail.sendMail({
      to: `${isStudent.name} <${isStudent.email}>`,
      subject: 'Welcome to GymPoint',
      template: 'welcome',
      context: {
        student: isStudent.name,
        plan: validPlan.title,
        end_date: formattedDate,
        price,
      },
    });

    return res.json({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Insuficient required data to update registration',
      });
    }

    const { id } = req.params;
    const { student_id, plan_id } = req.body;
    const registration = await Registration.findByPk(id);
    if (!registration) {
      return res.status(401).json({ error: 'Registration not found' });
    }

    const isStudent = await Student.findByPk(student_id);
    if (!isStudent) {
      return res.status(400).json({
        error: 'Student do not exists',
      });
    }

    const validPlan = await Plan.findByPk(plan_id);
    if (!validPlan) {
      return res.status(400).json({
        error: 'Plan do not exists',
      });
    }

    const start_date = new Date();
    const end_date = addMonths(start_date, validPlan.duration);
    const price = validPlan.effective_price;

    await registration.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json({ student_id, plan_id, start_date, end_date, price });
  }

  async delete(req, res) {
    const { id } = req.params;
    const registration = await Registration.findByPk(id);
    if (!registration) {
      return res
        .status(400)
        .json({ error: 'Could not find specified registration' });
    }

    try {
      await Registration.destroy({ where: { id } });
      return res.json({ deleted: 'Registration has been deleted' });
    } catch (error) {
      return res
        .status(500)
        .json(
          `Internal server error. Registration was not deleted => ${error}`
        );
    }
  }
}

export default new RegistrationController();
