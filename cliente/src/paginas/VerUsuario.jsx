import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Para obtener el ID del usuario desde la URL
import "../App.css";

function VerUsuario() {
  const [usuario, setUsuario] = useState({}); // Cambiado a un objeto vacío
  const { id } = useParams(); // Obtener el ID del usuario de la URL

  const fetchUsuario = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${id}`); // Llamada a un usuario específico
      const data = await response.json();
      setUsuario(data); // Actualizamos el estado con un solo usuario
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  };

  useEffect(() => {
    fetchUsuario(); // Llamar a la función para obtener el usuario cuando el componente se monte o cambie el ID
  }, [id]);

  // Verificar si el usuario está cargado
  if (!usuario || !usuario._id) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <>
      <h2>Detalles de Usuario</h2>
      <p><strong>ID:</strong> {usuario._id}</p>
      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>Email:</strong> {usuario.email}</p>
    </>
  );
}

export default VerUsuario;