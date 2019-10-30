/**
 * This file is used by sequelize-cli, so the syntax of import/export should not
 * be used here, since it doesn't have an implementation to suport those
 * keyWords.
 */
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gympoint',
  define: {
    timestamps: true, // Ensures createdAt and updatedAt columns automatically
    underscored: true, // Standardize underscore to column names
    underscoredAll: true,
  },
};
