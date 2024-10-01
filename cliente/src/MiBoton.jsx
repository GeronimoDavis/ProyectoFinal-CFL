function MiBoton({ funcion, estado }) {
  return (
    <>
      <button onClick={funcion}>Sumar, {estado}</button>
    </>
  );
}

export default MiBoton;
