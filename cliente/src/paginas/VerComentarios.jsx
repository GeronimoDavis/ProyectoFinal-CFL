import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function VerComentarios({ idPublicacion, usuarioLogeado }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const redireccionarUsuario = () => {
    if (!usuarioLogeado.logeado) {
      alert("Debes iniciar sesión para ver los comentarios");
      navigate("/");
    }
  };

  useEffect(() => {
    redireccionarUsuario();
  }, []);

  return (
    <div>
      <h1>Comentarios de la publicación {id}</h1>
    </div>
  );
}

export default VerComentarios;
