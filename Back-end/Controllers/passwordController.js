import { findUserByEmail, ChangePassword } from '../Services/databaseQuerys.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const saltRounds = 10;

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false,
  },
});

async function sendEmail({ to, newPassword }) {
  try {
    const info = await transporter.sendMail({
      from: `"NeuroPost" <$process.env.EMAIL_USER>`,
      to,
      subject: 'Recuperação de senha Neuropost',
      text: 'Aqui está a nova senha para Neuropost: ' + newPassword,
    });
    return 'Senha enviada com sucesso';
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return 'Erro ao mandar email';
  }
}

export async function passwordController(req, res) {
  const user = await findUserByEmail(req.body.email);

  if (!user) {
    return res.status(400).json({ mensagem: 'Usuário não encontrado' });
  }

  const newPassword = crypto.randomBytes(12).toString('base64').slice(0, 12);
  const hashedSenha = await bcrypt.hash(newPassword, saltRounds);

  try {
    const mensagem = await sendEmail({
      to: req.body.email,
      newPassword,
    });
    if (mensagem !== 'Senha enviada com sucesso') {
      return res.status(400).json({ mensagem });
    }

    await ChangePassword(user.id, hashedSenha);

    return res.status(200).json({ mensagem });
  } catch (error) {
    return res.status(400);
  }
}
