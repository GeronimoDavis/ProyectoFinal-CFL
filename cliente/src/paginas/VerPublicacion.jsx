import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function VerPublicacion() {
  const [publicacion, setPublicacion] = useState({ usuario: {} });
  const { id } = useParams();

  const fetchPublicacion = async () => {
    const respuesta = await fetch(
      `http://localhost:3000/api/publicaciones/${id}`
    );
    const data = await respuesta.json();
    setPublicacion(data);
  };

  useEffect(() => {
    fetchPublicacion();
  }, []);

  return (
    <>
      <h1>Publicacion:</h1>
      <h2>Titulo: {publicacion.titulo}</h2>
      <h2>Texto: {publicacion.texto}</h2>
      <h2>ID: {publicacion._id}</h2>
      <h2>Nombre usuario: {publicacion.usuario.nombre}</h2>
    </>
  );
}

export default VerPublicacion;
