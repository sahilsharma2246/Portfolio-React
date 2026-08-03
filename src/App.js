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
import ManageSkills from "./admin/ManageSkills";   // ✅ Added
import ManageCertificates from "./admin/ManageCertificates";
import Messages from "./admin/Messages";
import Profile from "./admin/Profile";
import AdminLayout from "./admin/AdminLayout";

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


        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/skills" element={<Skills />} />

        <Route path="/projects" element={<Projects />} />

        <Route 
          path="/certificates" 
          element={<Certificates />} 
        />

        <Route path="/resume" element={<Resume />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />




        {/* Admin Layout */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >

          <Route index element={<Dashboard />} />


          <Route 
            path="projects" 
            element={<ManageProjects />} 
          />


          <Route 
            path="skills" 
            element={<ManageSkills />} 
          />


          <Route 
            path="certificates" 
            element={<ManageCertificates />} 
          />


          <Route 
            path="messages" 
            element={<Messages />} 
          />


          <Route 
            path="profile" 
            element={<Profile />} 
          />


        </Route>




        {/* Logout */}

        <Route 
          path="/logout" 
          element={<Temp />} 
        />


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