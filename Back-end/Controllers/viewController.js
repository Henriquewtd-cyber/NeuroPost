import { CreateNewProject } from '../Services/databaseQuerys.js';

export async function viewController(req, res) {
  try {
    const { title, desc, img } = req.body;

    await CreateNewProject(req.usuario.id, title, desc, img);

    return res.status(201).json({ mensagem: 'Projeto salvo com sucesso.' });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao salvar projeto.', erro: error.message });
  }
}
