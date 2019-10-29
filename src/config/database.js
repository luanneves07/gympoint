/**
 * A sintaxe de import/export é feita da maneira antiga pois a interface do
 * terminal para o sequelize-cli ainda não consegue identificar a nova
 * terminologia.
 */
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gympoint',
  define: {
    timestamps: true, // Garante as colunas createdAt e updatedAt automaticamente
    underscored: true, // Pardoniza a nemenclatura das tabelas com _ no lugar de camelCase
    underscoredAll: true,
  },
};
