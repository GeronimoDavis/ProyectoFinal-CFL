import { useState } from "react";

function Boton({ texto }) {
  return (
    <button
      style={{
        backgroundColor: "red",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        margin: "10px",
      }}
    >
      {texto}
    </button>
  );
}

export default Boton;
