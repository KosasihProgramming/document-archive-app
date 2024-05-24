import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navigation = [
  {
    nama: "Data Dokumen",
    link: "/dashboard/documents",
    icon: "fa-file",
  },
  {
    nama: "Data Kosong",
    link: "/dashboard/kosong",
    icon: "fa-folder",
  },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar">
      {/* Sidebar - Brand */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/dashboard">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text mx-3">Kosasih</div>
      </a>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      <li
        className={`nav-item ${
          location.pathname === "/dashboard" ? "active" : ""
        }`}>
        <Link to="/dashboard" className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard</span>
        </Link>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
      <div className="sidebar-heading">Master Data</div>

      {navigation.map((nav, index) => (
        <li
          key={index}
          className={`nav-item ${
            location.pathname === nav.link ? "active" : ""
          }`}>
          <NavLink to={nav.link} className="nav-link">
            <i className={`fas fa-fw ${nav.icon}`} />
            <span>{nav.nama}</span>
          </NavLink>
        </li>
      ))}

      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
};

export default Sidebar;
