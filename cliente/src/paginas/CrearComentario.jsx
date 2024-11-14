import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CrearComentarios({ idPublicacion, usuarioLogeado }) {
  const [comentarios, setComentarios] = useState([]);

  function redireccionarUsuario() {
    if (!usuarioLogeado.logeado) {
      navigate("/");
      alert("Debes iniciar sesión para crear una publicación.");
    }
  }

  useEffect(() => {
    redireccionarUsuario();
  }, []);

  const manejarTexto = (e) => {
    setComentarios(e.target.value);
  };

  const enviarComentario = (e) => {
    e.preventDefault();

    if (!comentarios) {
      alert("El comentario no puede estar vacíos.");
      return;
    }
    console.log(comentarios);
    fetch("http://localhost:3000/api/comentarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comentarios: comentarios,
        publicacion: idPublicacion,
        usuario: usuarioLogeado.usuario._id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        navigate("/publicaciones");
      });
  };

  return (
    <div>
      <h1>Deja un Comentarios</h1>
    </div>
  );
}

export default CrearComentarios;
