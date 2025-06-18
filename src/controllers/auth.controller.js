import pkg from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.model.js"; //Modelo de Usuario

const { validationResult } = pkg;

//Registro
const register = async (req, res) => {
  //Verificar si hay errores de validación
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errors: errores.array() }); //devuelve los errores al cliente
  }

  const { nombre, apellido, email, telefono, contraseña } = req.body;

  try {
    //Validar si el email ya existe
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ message: "Este email ya está registrado" });
    }

    //Encriptar contraseña
    const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

    //Crear el nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      email,
      telefono,
      contraseñaHasheada,
    });
    await nuevoUsuario.save();

    //Enviar email de confirmación
    //código para enviar un email con un link de verificación

    //Generar token
    const token = jwt.sign(
      { id: nuevoUsuario._id, rol: nuevoUsuario.rol },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Resgistro exitoso", token });
  } catch (error) {
    //imprime el error en la terminal para verlo más detallado
    console.error("Error en el registro:", error);
    //muestra el msj del error en Postman
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

//Login
const login = async (req, res) => {
  //Verificar si hay errores de validación
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errors: errores.array() });
  }

  const { email, contraseña } = req.body;

  //Un log para ver que los datos estén llegando
  console.log("Email:", email);
  console.log("Constraseña:", contraseña);

  try {
    //Verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        message: "Usuario no registrado",
      });
    }

    //Verificar si la contraseña es correcta
    const contraseñaValida = await bcrypt.compare(
      contraseña,
      usuario.contraseñaHasheada
    );
    if (!contraseñaValida) {
      return res.status(400).json({
        message: "Contraseña incorrecta",
      });
    }

    //Generar token (JWT)
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
