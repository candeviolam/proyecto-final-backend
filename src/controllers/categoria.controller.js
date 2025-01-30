import Categoria from "../models/categoria.model.js";

//Crear una nueva categoría
const crearCategoria = async (req, res) => {
  const { nombre } = req.body;

  try {
    const nuevaCategoria = new Categoria({ nombre });
    await nuevaCategoria.save();
    res.json({
      message: "Categoría creada correctamente",
      categoria: nuevaCategoria,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear categoría", error: error.message });
  }
};

//Obtener todas las categorías
const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener categorías", error: error.message });
  }
};

//Modificar una categoría
const modificarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const categoria = await Categoria.findByIdAndUpdate(
      id,
      { nombre }, //el campo que se va a actualizar
      { new: true } //devuelve la categoría actualizada
    );

    //Si no se encuentra la categoría con el ID proporcionado
    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    //Si la actualización fue exitosa, envía la repsuesta
    res.json({ message: "Categoría modificada correctamente", categoria });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al modificar categoría", error: error.message });
  }
};

//Eliminar una categoría
const eliminarCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const categoria = await Categoria.findByIdAndDelete(id);

    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar categoría", error: error.message });
  }
};

export {
  crearCategoria,
  obtenerCategorias,
  modificarCategoria,
  eliminarCategoria,
};
