import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";
import { GrDocumentNotes } from "react-icons/gr";

const navigation = [
  {
    nama: "Data Dokumen",
    link: "/dashboard/documents",
    icon: <IoMdDocument />,
  },
  {
    nama: "Data Kosong",
    link: "/dashboard/kosong",
    icon: <GrDocumentNotes />,
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
          <div className="d-flex align-items-start">
            <MdDashboard />
            <span className="fw-bold ms-2">Dashboard</span>
          </div>
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
          <NavLink to={nav.link} className="nav-link ">
            <div className="d-flex align-items-start">
              {nav.icon}
              <span className="fw-bold ms-2">{nav.nama}</span>
            </div>
          </NavLink>
        </li>
      ))}

      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
};

export default Sidebar;
