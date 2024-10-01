import { useState, useEffect } from "react";
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
          </tr>
        </thead>
        <tbody>{mostrarFilas()}</tbody>
      </table>
    </>
  );
}

export default VerUsuarios;
