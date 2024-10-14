import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CrearPublicacion({ usuarioLogeado }) {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const navigate = useNavigate();

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
      <input
        type="text"
        name="titulo"
        value={titulo}
        placeholder="Titulo"
        onChange={manejarTitulo}
      />
      <input
        type="text"
        name="texto"
        value={texto}
        placeholder="Texto"
        onChange={manejarTexto}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default CrearPublicacion;
