/**
 * This file exists to create the conection with database based on
 * '/config/database file and load all models of the application.
 * It is used in app/app.js just to call the constructor of the class.
 * One time it has been called, all models will statically do database connection
 */
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Student from '../app/models/Student';

/**
 * This field should have all Models of the project.
 */
const models = [User, Student];

class Database {
  constructor() {
    this.init();
  }

  /**
   * Create database connection
   */
  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
