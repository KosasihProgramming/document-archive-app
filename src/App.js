import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./page/Dashboard";
import Document from "./page/Document";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div id="wrapper">
      <Router>
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/documents" element={<Document />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
