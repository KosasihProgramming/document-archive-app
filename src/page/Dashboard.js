import React, { Component } from "react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/Firebase";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: sessionStorage.getItem("isLoggedIn"),
      userEmail: sessionStorage.getItem("userEmail"),
      user: {},
    };
  }

  componentDidMount = () => {
    this.getUserLogin();
  };

  getUserLogin = async () => {
    const { userEmail } = this.state;
    try {
      const q = query(collection(db, "User"), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        this.setState({ user: userData });
      });
    } catch (error) {
      console.error("Error getting user:", error);
    }
  };

  render() {
    const { user } = this.state;
    return (
      <>
        <h1 className="h3 mb-2 text-gray-800">
          Welcome <span className="fw-bold">{user.display_name}</span>
        </h1>
      </>
    );
  }
}

export default Dashboard;
