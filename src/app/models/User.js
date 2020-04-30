// Os campos que estão no model não precisam ser um reflexo dos campos que estão no banco de dados,
// são apenas os campos que usuário vai poder preencher.

import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        // super = Model (Classe Pai)
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // nunca vai existir na base de dados
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // hooks like before and after delphi
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // static associate(models) {
  //  this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' }); // pertence há
  // }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
