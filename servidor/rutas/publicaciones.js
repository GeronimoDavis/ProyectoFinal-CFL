const express = require("express");
const router = express.Router();
const {
  crearPublicacion,
  verPublicaciones,
  verPublicacion,
  editarPublicacion,
  eliminarPublicacion,
} = require("../controladores/publicaciones");

router.get("/", verPublicaciones);
router.get("/:id", verPublicacion);
router.post("/", crearPublicacion);
router.put("/:id", editarPublicacion);
router.delete("/:id", eliminarPublicacion);

module.exports = router;
