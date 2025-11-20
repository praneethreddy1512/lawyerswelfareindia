import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Membership from './pages/Membership';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import JoinNow from './pages/JoinNow';
import Login from './pages/Login';
import Terms from './pages/Terms';
import Profile from './pages/Profile';
import Doctors from './pages/Doctors';
import Deceased from './pages/Deceased';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

// Admin Route component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isAdmin } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" />;
  }
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/join" element={<JoinNow />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctors"
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deceased"
              element={
                <ProtectedRoute>
                  <Deceased />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
