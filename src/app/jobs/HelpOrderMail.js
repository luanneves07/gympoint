import { format, parseISO } from 'date-fns';
import { en } from 'date-fns/locale';
import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderUniqueKey';
  }

  async handle({ data }) {
    const { student_name, student_email, admin_name, helpOrder } = data;

    await Mail.sendMail({
      to: `${student_name} <${student_email}>`,
      subject: 'Your question has been answered!',
      template: 'answer',
      context: {
        student: student_name,
        admin: admin_name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answerAt: format(
          parseISO(helpOrder.answerAt),
          "yyyy MMMM dd', at' H:mm'h'",
          {
            locale: en,
          }
        ),
      },
    });
  }
}

export default new HelpOrderMail();
