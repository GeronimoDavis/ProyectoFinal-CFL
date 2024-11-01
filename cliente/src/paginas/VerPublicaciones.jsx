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
    const filas = [];
    for (let i = 0; i < publicaciones.length; i += 3) {
      const grupo = publicaciones.slice(i, i + 3);
      filas.push(
        <div className="row" key={i}>
          {grupo.map((publicacion) => (
            <div className="col-md-4 mb-4" key={publicacion._id}>
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <h5 className="card-title">{publicacion.titulo}</h5>
                  <p className="card-text">{publicacion.texto}</p>
                  <Link to={`/publicaciones/${publicacion._id}`}>
                    Ver publicación
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return filas;
  }
  return (
    <>
    <br />
    <br />
      <h1>Publicaciones</h1>
      {mostrarCards()}
    </>
  );
}

export default VerPublicaciones;
