import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  

  

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>

        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/dashboard/projects">Projects</Link></li>
          <li><Link to="/dashboard/certificates">Certificates</Link></li>
          <li><Link to="/dashboard/messages">Messages</Link></li>
          <li><Link to="/dashboard/profile">Profile</Link></li>
        </ul>

        <Link to="/logout" className="logout-btn">
  Logout
</Link>
      </div>

      {/* Main Content */}
      <div className="main-content">

        <h1>Welcome Admin 👋</h1>
        <p>Manage your portfolio from here.</p>

        <div className="card-container">

          <div className="dashboard-card">
            <h2>Projects</h2>
            <h3>0</h3>
            <Link to="/dashboard/projects">Manage</Link>
          </div>

          <div className="dashboard-card">
            <h2>Certificates</h2>
            <h3>0</h3>
            <Link to="/dashboard/certificates">Manage</Link>
          </div>

          <div className="dashboard-card">
            <h2>Messages</h2>
            <h3>0</h3>
            <Link to="/dashboard/messages">View</Link>
          </div>

          <div className="dashboard-card">
            <h2>Profile</h2>
            <h3>1</h3>
            <Link to="/dashboard/profile">Edit</Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;