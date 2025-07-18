import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";

function Home() {
  return (
    <div className="container mt-5">
      <h1>Practice Portal</h1>
      <p>Welcome to your automation practice portal!</p>
      <Link to="/login" className="btn btn-primary mt-3">Go to Login</Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">PracticePortal</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
