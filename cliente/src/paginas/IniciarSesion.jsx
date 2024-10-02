import { useNavigate } from "react-router-dom";
import BotonNavegar from "../componentes/BotonNavegar";

function IniciarSesion({ usuarioLogeado, setUsuarioLogeado }) {
  const navigate = useNavigate();
  const fetchDesconectarse = async () => {
    const response = await fetch(
      "http://localhost:3000/api/usuarios/desconectarse",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    setUsuarioLogeado(data);
    navigate("/");
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Iniciar sesion</h1>
      {usuarioLogeado.logeado ? (
        <>
          <h1>Bienvenido! {usuarioLogeado.usuario.nombre}</h1>

          <BotonNavegar ruta="/usuarios" texto="Ver Usuarios" />
          <BotonNavegar ruta="/publicaciones" texto="Ver Publicaciones" />
          <BotonNavegar ruta="/publicaciones/crear" texto="Crear Publicación" />

          <button
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={fetchDesconectarse}
          >
            Desconectarse!
          </button>
        </>
      ) : (
        <a href="http://localhost:3000/api/usuarios/google">
          <button
            style={{
              backgroundColor: "#4285F4",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            {" "}
            <img
              style={{ width: "20px", height: "20px" }}
              src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
            />{" "}
            Iniciar Sesion con Google
          </button>
        </a>
      )}
    </div>
  );
}

export default IniciarSesion;
