const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  googleId: { type: String, unique: true },
  publicaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Publicacion" }],
});

module.exports = mongoose.model("Usuario", usuarioSchema);
