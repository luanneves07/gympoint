import Sequelize, { Model } from 'sequelize';

class User extends Model {
  /**
   * Metodo chamado pelo sequelize de acordo com a configuracao do projeto
   * Precisa receber como parametro a conexao com o banco de dados
   */
  static init(connection) {
    const columns = {
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password_hash: Sequelize.STRING,
    };
    /* O primeiro parametro sao as colunas do banco. No segundo parametro a conexao */
    super.init(columns, { connection });
  }
}

export default new User();
