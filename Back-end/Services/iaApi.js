import dotenv from 'dotenv';
import { uploadImg } from '../Services/cloudinaryApi.js';

import { GoogleGenAI, PersonGeneration } from '@google/genai';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.API_SECRET_GOOGLE });

export async function gerarTxt(prompt) {
  if (!prompt) {
    return false;
  }

  const texto =
    `Você é um agente publicitário trabalhando para criar publicações na plataforma instagram,
   dessa forma desenvolva APENAS UM texto que seja informativo e envolvente para ser usado agora na descrição de uma publicação com o seguinte tema:` +
    prompt +
    'como resposta me envie APENAS UM json que contém esse formato: {mensagem: (descrição), titulo: (titulo da publicação)}';

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: texto,
    generationConfig: {
      responseMimeType: 'application/json',
    },
  });

  function cortar(texto) {
    texto = texto.replace(/```/, '');
    texto = texto.replace(/```/, '');
    texto = texto.replace('json', '');
    return texto;
  }

  return JSON.parse(cortar(response.text));
}

export async function gerarImg(prompt) {
  if (!prompt) {
    return false;
  }

  const texto =
    `Você é um agente publicitário trabalhando para criar publicações na plataforma instagram,
   dessa forma crie uma imagem para ser usada em uma publicação com esse tema:` + prompt;

  try {
    const data = { response_format: 'b64_json', prompt: texto, model: 'black-forest-labs/flux-dev' };
    const response = await fetch('https://router.huggingface.co/nebius/v1/images/generations', {
      headers: {
        Authorization: `Bearer ${process.env.HUGINGFACE_API}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    });
    const json = await response.json();
    const base64Data = await json.data[0].b64_json;

    const buffer = Buffer.from(base64Data, 'base64');
    return await uploadImg(buffer);
  } catch (error) {
    console.error(error);
  }
}
