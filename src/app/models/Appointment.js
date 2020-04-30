// Os campos que estão no model não precisam ser um reflexo dos campos que estão no banco de dados,
// são apenas os campos que usuário vai poder preencher.

import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        // super = Model (Classe Pai)
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' }); // pertence há
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' }); // pertence há
  }
}

export default Appointment;
