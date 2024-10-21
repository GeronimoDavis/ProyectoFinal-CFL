import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top w-100" >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Mi perfil</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/publicaciones">Publicaciones</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/usuarios">Usuarios</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/publicaciones/crear">Crear publicacion</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}