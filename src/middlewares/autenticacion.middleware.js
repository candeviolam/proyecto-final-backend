import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verificarToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Acceso denegado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const usuarioVerificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = usuarioVerificado;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token inválido" });
  }
};

export const esAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.rol !== "admin") {
    return res
      .status(403)
      .json({ message: "Acceso solo para administradores" });
  }
  next();
};
