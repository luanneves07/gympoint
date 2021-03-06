/**
 * This file exists to create the conection with database based on
 * '/config/database file and load all models of the application.
 * It is used in app/app.js just to call the constructor of the class.
 * One time it has been called, all models will statically do database connection
 */
import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';
import CheckIn from '../app/models/CheckIn';

/**
 * This field should have all Models of the project.
 */
const models = [User, Student, Plan, Registration, CheckIn];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  /**
   * Create database connection
   */
  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gympoint',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
