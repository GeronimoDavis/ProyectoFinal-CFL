import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  function mostrarCards() {
    let card = publicaciones.map((publicacion) => {
      return (
        <div className="card" style={{ width: "18rem" }} key={publicacion._id}>
          <div className="card-body">
            <h5 className="card-title">{publicacion.titulo}</h5>
            <p className="card-text">{publicacion.texto}</p>
            <Link to={`/publicaciones/${publicacion._id}`}>
              Ver publicacion
            </Link>
          </div>
        </div>
      );
    });
    return card;
  }
  return (
    <>
      <h1>Publicaciones</h1>
      {mostrarCards()}
    </>
  );
}

export default VerPublicaciones;
