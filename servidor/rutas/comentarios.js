const express = require("express");
const router = express.Router();

const {
    verComentarios,
    crearComentario,
    editarComentarios,
    eliminarComentario
} = require("../controladores/comentarios");

router.get("/", verComentarios);
router.post("/", crearComentario);
router.put("/:id", editarComentarios);
router.delete("/:id", eliminarComentario);

module.exports = router;