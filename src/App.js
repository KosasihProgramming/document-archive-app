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

  return (
    <div id="wrapper">
      {!isLoginPage && <Sidebar />}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {!isLoginPage && <Navbar />}
          <div className="container-fluid">
            <Routes>
              {isLoggedIn ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/documents" element={<Document />} />
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
