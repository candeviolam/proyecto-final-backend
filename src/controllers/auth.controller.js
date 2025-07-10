import pkg from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.model.js";

const { validationResult } = pkg;

const register = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errors: errores.array() });
  }

  const { nombre, apellido, email, telefono, contraseña } = req.body;

  try {
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ message: "Este email ya está registrado" });
    }

    const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      email,
      telefono,
      contraseñaHasheada,
    });
    await nuevoUsuario.save();

    const token = jwt.sign(
      { id: nuevoUsuario._id, rol: nuevoUsuario.rol },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({ message: "Registro exitoso", token });
  } catch (error) {
    console.error("Error en el registro:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

const login = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errors: errores.array() });
  }

  const { email, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        message: "Usuario no registrado",
      });
    }

    const contraseñaValida = await bcrypt.compare(
      contraseña,
      usuario.contraseñaHasheada
    );
    if (!contraseñaValida) {
      return res.status(400).json({
        message: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Ha iniciado sesión correctamente", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

export { register, login };
