import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditarPublicacion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");

  const fetchObtenerPublicacion = async () => {
    const respuesta = await fetch(`http://localhost:3000/api/publicaciones/${id}`);
    const data = await respuesta.json();

    setTitulo(data.titulo);
    setTexto(data.texto);
  };

  useEffect(() => {
    fetchObtenerPublicacion();
  }, []);

  const manejarTexto = (e) => {
    setTexto(e.target.value);
  };

  const manejarTitulo = (e) => {
    setTitulo(e.target.value);
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    console.log(titulo, texto);
    fetch(`http://localhost:3000/api/publicaciones/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: titulo,
        texto: texto,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        navigate("/publicaciones");
      });
  };

  return( <>
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
  
  </>);
}

export default EditarPublicacion;