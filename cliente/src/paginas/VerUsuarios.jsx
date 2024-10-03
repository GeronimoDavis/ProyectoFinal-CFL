import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function VerUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = async () => {
    const response = await fetch("http://localhost:3000/api/usuarios");
    const data = await response.json();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const mostrarFilas = () => {
    return usuarios.map((usuario) => {
      return (
        <tr key={usuario._id}>
          <td>{usuario._id}</td>
          <td>{usuario.nombre}</td>
          <td>{usuario.email}</td>
          <td>
            <Link to={`/usuarios/${usuario._id}`}>Ver mas</Link>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{mostrarFilas()}</tbody>
      </table>
    </>
  );
}

export default VerUsuarios;
