import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Admin Pages & Layout
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ManageProjects from './admin/ManageProjects';
import ManageSkills from './admin/ManageSkills';
import ManageCertificates from './admin/ManageCertificates';
import Messages from './admin/Messages';
import Profile from './admin/Profile';

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="relative min-h-screen bg-[#f8f9fa] text-zinc-900 flex flex-col justify-between overflow-x-hidden selection:bg-cyan-100 selection:text-cyan-800 font-sans">
      
      {/* Global Soft Ambient Glows */}
      {!isAdminRoute && (
        <>
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-indigo-100/60 via-purple-100/40 to-transparent blur-[120px] rounded-full pointer-events-none z-0" />
          <div className="fixed top-1/3 right-0 w-[500px] h-[400px] bg-cyan-100/40 blur-[140px] rounded-full pointer-events-none z-0" />
        </>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        {/* Show Navbar on non-admin pages */}
        {!isAdminRoute && <Navbar />}

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/admin/projects" element={<AdminLayout><ManageProjects /></AdminLayout>} />
            <Route path="/admin/skills" element={<AdminLayout><ManageSkills /></AdminLayout>} />
            <Route path="/admin/certificates" element={<AdminLayout><ManageCertificates /></AdminLayout>} />
            <Route path="/admin/messages" element={<AdminLayout><Messages /></AdminLayout>} />
            <Route path="/admin/profile" element={<AdminLayout><Profile /></AdminLayout>} />
          </Routes>
        </main>

        {/* Show Footer on non-admin pages */}
        {!isAdminRoute && <Footer />}
      </div>

    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;