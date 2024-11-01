const Comentario = require("../modelos/comentario");
const Publicaciones = require("../modelos/publicaciones");
const Usuario = require("../modelos/usuario");

const verComentarios = async (req, res) => {
  const comentarios = await Comentario.find({});
  res.json(comentarios);
};

const crearComentario = async (req, res) => {
  const { usuario, publicacion, texto } = req.body; // toma los valores del cuerpo de la peticion
  const nuevoComentario = new Comentario({ usuario, publicacion, texto }); //Crear un nuevo comentario usando usando los datos de la peticion

  const publicacionDelComentario = await Publicaciones.findById(publicacion);
  publicacionDelComentario.comentarios.push(nuevoComentario._id); // esta linea guarda el cometario en el array de modelos de publicaciones
  await publicacionDelComentario.save(); // se guarda en la base de datos

  const usuarioDelComentario = await Usuario.findById(usuario); // se busaca el usuario que hizo el comentario por su id
  usuarioDelComentario.comentarios.push(nuevoComentario._id); // se guarda el comentario en el array de comentarios de usuarios
  await usuarioDelComentario.save();

  await nuevoComentario.save(); // se guarda el comentario en la base de datos

  res.json({ nuevoComentario, mensaje: "Comentario creado!" }); // Envía una respuesta json al cliente, confirmando que el comentario fue creado exitosamente. La respuesta incluye el objeto nuevoComentario y un mensaje.
};

const eliminarComentario = async (req, res) => {
  const { id } = req.params; // Obtiene el ID del comentario de la URL
  const comentarioEliminar = await Comentario.findByIdAndDelete(id); // Busca y elimina el comentario con el ID especificado
  const publicacion = await Publicaciones.findById(
    comentarioEliminar.publicacion
  ); // Busca la publicacion del comentario
};

module.exports = {
  verComentarios,
  crearComentario,
};
