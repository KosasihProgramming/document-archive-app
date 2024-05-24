import React, { Component } from "react";
import { Link } from "react-router-dom";

class NoData extends Component {
  render() {
    return (
      <>
        <>
          <div className="text-center">
            <div className="error mx-auto" data-text={500}>
              500
            </div>
            <p className="lead text-gray-800 mb-5">Kesalahan server</p>
            <p className="text-gray-500 mb-0">
              Belum ada tampilan untuk halaman ini 😊
            </p>
            <Link to={"/dashboard"}>← Back to Dashboard</Link>
          </div>
        </>
      </>
    );
  }
}

export default NoData;
