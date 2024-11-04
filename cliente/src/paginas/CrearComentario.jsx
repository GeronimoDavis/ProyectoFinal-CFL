import { useState, useEffect } from "react";

function CrearComentarios() {

    const [comentarios, setComentarios] = useState([]);

    function redireccionarUsuario() {
        if (!usuarioLogeado.logeado) {
          navigate("/");
          alert("Debes iniciar sesión para crear una publicación.");
        }
      }
    
    useEffect(() => {
        redireccionarUsuario();
      }, []);


}

