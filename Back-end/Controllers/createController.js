import { gerarTxt, gerarImg } from '../Services/iaApi.js';

export async function createController(req, res) {
  const img = await gerarImg(req.body.txtImg);

  const texto = await gerarTxt(req.body.txtDesc);
  const imgUrl = img.url;
  //let texto = { descrição: 'abababbababbabzzzzzzzzzzzzzzzzzzssssksssjsj', titulo: 'aboboras assassinas' };
  let mensagem = '';
  const dados = { descrição: '', urlImg: '', id: '' };

  dados.id = img.id;

  if (imgUrl && req.body.txtImg && texto && req.body.txtDesc) {
    mensagem = 'Projeto criado';
    dados.descrição = texto;
    dados.urlImg = imgUrl;
  } else if (imgUrl && req.body.txtImg) {
    mensagem = 'Imagem criada';
    dados.descrição = '';
    dados.urlImg = imgUrl;
  } else if (texto && req.body.txtDesc) {
    mensagem = 'Descrição criada';
    dados.descrição = texto;
    dados.urlImg = '';
  } else {
    return res.status(500).json({ mensagem: 'Erro ao criar' });
  }
  return res.status(200).json({ mensagem, dados });
}
