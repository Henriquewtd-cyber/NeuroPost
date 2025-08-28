import bcrypt from 'bcrypt';
const saltRounds = 10;

import { CreateNewUser } from '../Services/databaseQuerys.js';

export async function registrerController(req, res) {
  try {
    const { nome, email, senha } = req.body;
    console.log(nome);
    const password = await bcrypt.hash(senha, saltRounds);

    await CreateNewUser(nome, email, password);

    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao cadastrar usuário.', erro: error.message });
  }
}
