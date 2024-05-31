import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./page/Dashboard";
import Document from "./page/Document";
import Login from "./page/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NoData from "./page/NoData";
// import TestSidebar from "./components/TestSidebar";
import { useState } from "react";
import DocumentEdit from "./page/DocumentEdit";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div id="wrapper" className={isSidebarVisible ? "" : "toggled"}>
      {!isLoginPage && (
        <Sidebar
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        />
      )}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {!isLoginPage && <Navbar toggleSidebar={toggleSidebar} />}
          <div className="container-fluid">
            <Routes>
              {isLoggedIn ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/documents" element={<Document />} />
                  <Route
                    path="/dashboard/documents/:id/edit"
                    element={<DocumentEdit />}
                  />
                  <Route path="/dashboard/kosong" element={<NoData />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Login />} />
                </>
              )}
            </Routes>
          </div>
        </div>
        {!isLoginPage && <Footer />}
      </div>
    </div>
  );
}

export default App;
