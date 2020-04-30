// Index, Show, Store, Update, Delete
import jwt from 'jsonwebtoken';

import User from '../models/User';
// import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      /**
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ], */
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado!' });
    }

    if (!(await user.checkPassword(password))) {
      return res
        .status(401)
        .json({ error: 'A senha informada está incorreta!' });
    }

    const { id, name, /** avatar, */ provider } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        // avatar,
        provider,
      }, // https://www.md5online.org/
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
