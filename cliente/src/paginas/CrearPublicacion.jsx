import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CrearPublicacion({ usuarioLogeado }) {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const navigate = useNavigate();

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
    setTexto(e.target.value);
  };

  const manejarTitulo = (e) => {
    setTitulo(e.target.value);
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    if (!usuarioLogeado.logeado) {
      navigate("/");
    }
    if (!titulo || !texto) {
      alert("El título y el texto no pueden estar vacíos.");
      return;
    }
    console.log(titulo, texto);
    fetch("http://localhost:3000/api/publicaciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: titulo,
        texto: texto,
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
    <form onSubmit={enviarFormulario}>
      <div class="mb-3">
        <label class="form-label">Titulo</label>
        <input
          class="form-control"
          type="text"
          name="titulo"
          value={titulo}
          placeholder="Titulo"
          onChange={manejarTitulo}
        />
        <div class="form-text">Titulo de tu publicacion!!</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Contenido</label>
        <input
          class="form-control"
          type="text"
          name="texto"
          value={texto}
          placeholder="Texto"
          onChange={manejarTexto}
        />
        <div class="form-text">Contenido de tu publicacion</div>
      </div>
      <button type="submit" class="btn btn-primary">
        Enviar
      </button>
    </form>
  );
}

export default CrearPublicacion;
