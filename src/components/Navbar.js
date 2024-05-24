import React from "react";
import Swal from "sweetalert2";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const onClick = () => {
    Swal.fire({
      title: "Yakin ingin keluar?",
      showCancelButton: true,
      confirmButtonText: "Keluar",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("userEmail");
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Berhasil logout",
          showConfirmButton: false,
          timer: 1500,
          didClose: () => {
            window.location.href = "/";
          },
        });
      }
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* Sidebar Toggle (Topbar) */}
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3">
          <i className="fa fa-bars" />
        </button>
        {/* Topbar Navbar */}
        <ul className="navbar-nav ml-auto">
          {/* Nav Item - Search Dropdown (Visible Only XS) */}
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              <i className="fas fa-search fa-fw" />
            </a>
            {/* Dropdown - Messages */}
            <div
              className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown">
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          <div className="topbar-divider d-none d-sm-block" />
          {/* Nav Item - User Information */}
          <li className="nav-item dropdown no-arrow">
            <div
              onClick={onClick}
              className="nav-link dropdown-toggle border-0 bg-light"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              <div className="d-flex align-items-start">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  Keluar
                </span>
                <IoIosLogOut />
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
