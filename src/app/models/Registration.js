import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Registration extends Model {
  static init(connection) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.DECIMAL,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
      },
      { sequelize: connection }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Registration;
