import React from "react";
import LogoDH from "../../assets/images/logo-DH.png";
import { Link } from "react-router-dom";

function SideBar(props){
    return(
        <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">
        
        {/* <!-- Sidebar - Brand --> */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
            <div className="sidebar-brand-icon">
                <img className="w-100" src={LogoDH} alt="Digital House" />
            </div>
        </a>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/* <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
            <Link className="nav-link" to="/">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard - DH movies</span></Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Heading --> */}
        <div className="sidebar-heading">Actions</div>

        {/* <!-- Nav Item - Pages --> */}
        <li className="nav-item">
            <Link className="nav-link collapsed" to="/last-movie">
                <i className="fas fa-fw fa-folder"></i>
                <span>Last Movie</span>
            </Link>
        </li>

        {/* <!-- Nav Item - Charts --> */}
        <li className="nav-item">
            <Link className="nav-link" to="/generos">
                <i className="fas fa-fw fa-chart-area"></i>
                <span>Generos</span></Link>
        </li>

        {/* <!-- Nav Item - Tables --> */}
        <li className="nav-item">
            <Link className="nav-link" to="/listado">
                <i className="fas fa-fw fa-table"></i>
                <span>Listado Peliculas</span></Link>
        </li>

        <li className="nav-item">
            <Link className="nav-link" to="/busqueda">
                <i className="fas fa-fw fa-table"></i>
                <span>Buscador Peliculas</span></Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />
        
    </ul>
    )
}

export default SideBar;