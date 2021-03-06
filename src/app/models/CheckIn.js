import { Model } from 'sequelize';

class CheckIn extends Model {
  static init(connection) {
    super.init({}, { sequelize: connection });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default CheckIn;
