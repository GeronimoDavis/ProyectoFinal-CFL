const Publicacion = require("../modelos/publicacion");
const Usuario = require("../modelos/usuario");

const crearPublicacion = async (req, res) => {
  const { usuario, titulo, texto } = req.body;
  console.log(usuario);
  console.log(titulo);
  console.log(texto);
  const publicacion = new Publicacion({ usuario, titulo, texto });
  await publicacion.save();
  const usuarioActual = await Usuario.findById(publicacion.usuario);
  usuarioActual.publicaciones.push(publicacion._id);
  await usuarioActual.save();
  res.json({ publicacion, mensaje: "Publicacion creada!" });
};

const verPublicaciones = async (req, res) => {
  const publicaciones = await Publicacion.find();
  res.json(publicaciones);
};

const verPublicacion = async (req, res) => {
  const { id } = req.params;
  const publicacion = await Publicacion.findById(id).populate("usuario");
  res.json(publicacion);
};

const editarPublicacion = async (req, res) => {
  const { id } = req.params;
  const { titulo, texto } = req.body;
  const publicacion = await Publicacion.findByIdAndUpdate(id, {
    titulo,
    texto,
  });
  res.json({ publicacion, mensaje: "Publicacion actualizada!" });
};

const eliminarPublicacion = async (req, res) => {
  const { id } = req.params;
  const publicacion = await Publicacion.findByIdAndDelete(id);
  const usuario = await Usuario.findById(publicacion.usuario);
  usuario.publicaciones = usuario.publicaciones.filter(
    (publicacionId) => publicacionId.toString() !== id
  );
  await usuario.save();
  res.json({ publicacion, mensaje: "Publicacion eliminada!" });
};

module.exports = {
  crearPublicacion,
  verPublicaciones,
  verPublicacion,
  editarPublicacion,
  eliminarPublicacion,
};
