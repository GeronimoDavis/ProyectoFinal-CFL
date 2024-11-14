import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CrearComentarios({ idPublicacion, usuarioLogeado }) {
  const [comentarios, setComentarios] = useState("");
  const navigate = useNavigate();


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
      <textarea name="comentarios" style={{ 
        width: '500px', 
        height: '200px', 
        backgroundColor: 'lightgray', 
        color: 'black' 
    }} onChange={manejarTexto} ></textarea>
    <br />
    <button onClick={enviarComentario}>Enviar Comentario</button>
    </div>
  );
}

export default CrearComentarios;
