import {useNavigate} from "react-router-dom";


export default function BotonNavegar({ ruta, texto }) {
    const navigate = useNavigate(); // Hook para navegar entre rutas

    const manejarClick = function() {
        navigate(ruta); // Redirige a la ruta que se pasa como prop
    };


    return (
        <button onClick={manejarClick}>
          {texto} {/* Texto que se mostrará en el botón */}
        </button>
      );
}

