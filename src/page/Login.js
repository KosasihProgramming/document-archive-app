import React, { Component } from "react";
import { auth } from "../config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      baseURL: process.env.REACT_APP_AUTH_DOMAIN_FIREBASE,
    };
  }

  handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("userEmail", email);

      Swal.fire(
        {
          icon: "success",
          title: "Berhasil",
          text: "Selamat, Anda Berhasil Masuk ",
          showConfirmButton: false,
          timer: 1500,
        },
        () => {
          window.location.href = `/dashboard`;
        }
      );
      window.location.href = `/dashboard`;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Anda Gagal Masuk, Periksa Kembali Passowrd dan Email Anda ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  render() {
    return (
      <>
        <div className="container">
          {/* Outer Row */}
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  {/* Nested Row within Card Body */}
                  <div className="row p-5">
                    <div className="col-lg-8 mx-auto">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">
                            Welcome Back!
                          </h1>
                        </div>
                        <form className="user">
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control form-control-user"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                              onChange={(e) => {
                                this.setState({ email: e.target.value });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control form-control-user"
                              id="exampleInputPassword"
                              placeholder="Password"
                              onChange={(e) => {
                                this.setState({ password: e.target.value });
                              }}
                            />
                          </div>
                          <hr />
                          <button
                            onClick={this.handleLogin}
                            className="btn btn-primary btn-user btn-block">
                            Login
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
