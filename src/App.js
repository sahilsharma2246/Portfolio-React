import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Certificates from "./pages/Certificates";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import Dashboard from "./admin/Dashboard";
import ManageProjects from "./admin/ManageProjects";
import ManageCertificates from "./admin/ManageCertificates";
import Messages from "./admin/Messages";
import Profile from "./admin/Profile";

import PrivateRoute from "./components/PrivateRoute";
import Temp from "./Temp";

function Layout() {
  const location = useLocation();

  const hideLayout =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/logout";

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* User Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Pages */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/projects"
          element={
            <PrivateRoute>
              <ManageProjects />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/certificates"
          element={
            <PrivateRoute>
              <ManageCertificates />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/messages"
          element={
            <PrivateRoute>
              <Messages />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path="/logout" element={<Temp />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;