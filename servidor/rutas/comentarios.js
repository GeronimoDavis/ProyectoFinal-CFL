const express = require("express");
const router = express.Router();

const {
  crearComentario,
  editarComentarios,
  eliminarComentario,
} = require("../controladores/comentarios");

router.post("/", crearComentario);
router.put("/:id", editarComentarios);
router.delete("/:id", eliminarComentario);

module.exports = router;
