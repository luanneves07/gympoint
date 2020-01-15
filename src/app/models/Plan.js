import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(connection) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.DECIMAL,
        effective_price: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.price * this.duration;
          },
        },
      },
      { sequelize: connection }
    );

    return this;
  }
}

export default Plan;
