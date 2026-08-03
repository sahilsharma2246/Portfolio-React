import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <aside className="sidebar">

        <h2 className="logo">
          Admin Panel
        </h2>


        <nav>

          <Link to="/dashboard">
            Dashboard
          </Link>


          <Link to="/dashboard/projects">
            Manage Projects
          </Link>


          <Link to="/dashboard/skills">
            Manage Skills
          </Link>


          <Link to="/dashboard/certificates">
            Manage Certificates
          </Link>


          <Link to="/dashboard/messages">
            Messages
          </Link>


          <Link to="/dashboard/profile">
            Profile
          </Link>


          <Link to="/logout" className="logout">
            Logout
          </Link>


        </nav>


      </aside>



      {/* Main Content */}

      <div className="main-content">


        <div className="page-content">

          <Outlet />

        </div>


      </div>


    </div>
  );
}

export default AdminLayout;