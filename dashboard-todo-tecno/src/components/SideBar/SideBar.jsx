import React from "react";
//import Logo from "../../assets/images/logo-DH.png";
import { Link } from "react-router-dom";

const Logo = "http://localhost:3000/images/logo-tablet.png";

function SideBar(props){
    return(
        <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">
        
        {/* <!-- Sidebar - Brand --> */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
            <div className="sidebar-brand-icon">
                <img className="w-100" src={Logo} alt="Todo Tecno" />
            </div>
        </a>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
            <Link className="nav-link" to="/">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard - Todo Tecno</span></Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading">Actions</div>

        {/* <!-- Nav Item - Pages --> */}
        <li className="nav-item">
            <Link className="nav-link collapsed" to="/last-movie">
                <i className="fas fa-fw fa-folder"></i>
                <span>Información de Ventas</span>
            </Link>
        </li>

        {/* <!-- Nav Item - Charts --> */}
        <li className="nav-item">
            <Link className="nav-link" to="/generos">
                <i className="fas fa-fw fa-chart-area"></i>
                <span>Crear Producto</span></Link>
        </li>

        {/* <!-- Nav Item - Tables --> */}
        <li className="nav-item">
            <Link className="nav-link" to="/listado">
                <i className="fas fa-fw fa-table"></i>
                <span>Editar/Eliminar Producto</span></Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />
        
    </ul>
    )
}

export default SideBar;