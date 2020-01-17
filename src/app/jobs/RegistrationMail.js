import { format, parseISO } from 'date-fns';
import { en } from 'date-fns/locale';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMailUniqueKeyForJobs';
  }

  async handle({ data }) {
    const { name, email, title, end_date, price } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Welcome to GymPoint',
      template: 'welcome',
      context: {
        student: name,
        plan: title,
        end_date: format(parseISO(end_date), 'yyyy MMMM dd', {
          locale: en,
        }),
        price,
      },
    });
  }
}

export default new RegistrationMail();
