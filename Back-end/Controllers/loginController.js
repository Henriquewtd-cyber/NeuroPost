import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserByEmail } from '../Services/databaseQuerys.js';

dotenv.config();
const SECRET = process.env.JWT_SECRET;

export async function loginController(req, res) {
  const user = await findUserByEmail(req.body.email);

  if (!user) {
    return res.status(401).json({ mensagem: 'Usuário inválido' });
  }

  const isValid = await bcrypt.compare(req.body.senha, user.password);
  if (isValid) {
    let expiresIn = '2h';
    if (req.body.manter) expiresIn = '7d';

    const token = jwt.sign({ id: user.id }, SECRET, {
      expiresIn,
    });
    return res.status(200).json({ mensagem: 'Login efetuado com sucesso', token });
  } else {
    return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
  }
}
