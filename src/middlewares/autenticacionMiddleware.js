//Para proteger rutas y validar roles (admin o usuario normal)

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verificarToken = (req, res, next) => {
  const token = req.header("Autorización");

  if (!token) return res.status(401).json({ message: "Acceso denegado" });

  try {
    const usuarioVerificado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = usuarioVerificado; //Se agrega el usuario decodificado al request
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
