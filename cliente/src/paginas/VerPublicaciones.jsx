import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BotonNavegar from "../componentes/BotonNavegar";

function VerPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);

  const fetchPublicaciones = async () => {
    const respuesta = await fetch("http://localhost:3000/api/publicaciones");
    const datos = await respuesta.json();
    setPublicaciones(datos);
    console.log(datos);
  };

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  const mostrarFilas = () => {
    let filas = publicaciones.map((publicacion, index) => {
      return (
        <tr key={index}>
          <td>{publicacion._id}</td>
          <td>{publicacion.titulo}</td>
          <td>{publicacion.texto}</td>
          <td>
            <Link to={`/publicaciones/${publicacion._id}`}>Ver mas</Link>
          </td>
        </tr>
      );
    });
    return filas;
  };

  return (
    <>
      <BotonNavegar ruta="/publicaciones/crear" texto="Crear Publicación" />
      <h1>Publicaciones</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Texto</th>
          </tr>
        </thead>
        <tbody>{mostrarFilas()}</tbody>
      </table>
    </>
  );
}

export default VerPublicaciones;