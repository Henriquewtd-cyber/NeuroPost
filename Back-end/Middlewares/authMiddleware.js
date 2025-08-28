import jwt from 'jsonwebtoken';

export function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não enviado' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ mensagem: 'Token não enviado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ mensagem: 'Token inválido' });

    req.usuario = usuario;
    next();
  });
}
