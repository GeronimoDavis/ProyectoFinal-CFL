import { useState, useEffect } from "react";
import { Route, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CrearComentarios from "./CrearComentario";
import VerComentarios from "./VerComentarios";

function VerPublicacion({ usuarioLogeado }) {
  const [publicacion, setPublicacion] = useState({ usuario: {} });
  const { id } = useParams();
  const navigate = useNavigate();

  const redireccionarUsuario = () => {
    if (!usuarioLogeado?.logeado) {
      alert("Debes iniciar sesión para ver una publicación");
      navigate("/");
    }
  };

  useEffect(() => {
    redireccionarUsuario();
  }, []);

  const fetchEliminarPublicacion = () => {
    fetch(`http://localhost:3000/api/publicaciones/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          navigate("/publicaciones");
        }
      })
      .catch((error) => {
        navigate("/publicaciones");
        console.log(error);
        alert(error);
      });
  };

  const EditarLaPublicacion = () => {
    navigate(`/publicaciones/editar/${id}`);
  };

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
      <br />
      <br />
      <h1>Publicacion:</h1>
      <h2>Titulo: {publicacion.titulo}</h2>
      <h2>Texto: {publicacion.texto}</h2>
      <h2>ID: {publicacion._id}</h2>
      <h2>Nombre usuario: {publicacion.usuario.nombre}</h2>
      <button
        style={{ backgroundColor: "red" }}
        onClick={fetchEliminarPublicacion}
      >
        Borra publicacion
      </button>
      <br />
      <br />
      <button
        style={{ backgroundColor: "green" }}
        onClick={EditarLaPublicacion}
      >
        Editar publicacion
      </button>
      <br />
      <br />
      <CrearComentarios
        idPublicacion={publicacion._id}
        usuarioLogeado={usuarioLogeado}
      />
      <br />
      <br />
      <VerComentarios
        idPublicacion={publicacion._id}
        usuarioLogeado={usuarioLogeado}
      />
    </>
  );
}

export default VerPublicacion;
