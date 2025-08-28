import { ListAllProjects } from '../Services/databaseQuerys.js';

export async function projectsController(req, res) {
  try {
    const projetos = await ListAllProjects(req.usuario.id);
    return res.status(200).json({ projetos });
  } catch (error) {
    return res.status(404).json({ mensagem: 'Erro na busca' });
  }
}
