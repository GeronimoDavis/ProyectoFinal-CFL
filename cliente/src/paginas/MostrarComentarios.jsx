function MostrarComentarios({ comentarios }) {
  if (!comentarios || comentarios.length === 0) {
    return (
      <div>
        <h2 className="text-center">No hay comentarios</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2 className="text-center">Comentarios</h2>
        <ul className="list-group">
          {comentarios.map((comentario) => (
            <li className="list-group-item" key={comentario._id}>
              {comentario.texto}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MostrarComentarios;
