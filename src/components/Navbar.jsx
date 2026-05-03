import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

export default function Navbar({ user, setUser, userRole, setUserRole }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    setUser(null);
    setUserRole(null);
    navigate('/');
  };

  const isHome = location.pathname === '/';

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Link to="/" className="nav-brand">
            💅 Sofi Luxe <span>Nails</span>
          </Link>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`} onClick={handleLinkClick}>
            {isHome ? (
              <>
                <a href="#home" className="nav-link">Home</a>
                <a href="#services" className="nav-link">Services</a>
                <a href="#testimonials" className="nav-link">Testimonials</a>
                <Link to="/gallery" className="nav-link">Gallery</Link>
                <a href="#contact" className="nav-link">Contact</a>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/#services" className="nav-link">Services</Link>
                <Link to="/#testimonials" className="nav-link">Testimonials</Link>
                <Link to="/gallery" className="nav-link">Gallery</Link>
                <Link to="/#contact" className="nav-link">Contact</Link>
              </>
            )}

            {userRole === 'admin' && (
              <Link to="/admin" className="nav-link" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>Admin Panel</Link>
            )}

            <Link to="/booking" className="btn btn-primary btn-sm nav-cta">Book Now</Link>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '10px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)' }}>Hi, {user}</span>
                <button onClick={handleLogout} className="btn" style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#fee2e2', color: '#991b1b', border: 'none' }}>Logout</button>
              </div>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); setAuthOpen(true); }}
                className="btn btn-secondary btn-sm nav-cta"
                style={{ marginLeft: '10px' }}
              >
                Login / Sign Up
              </button>
            )}
          </div>

          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLoginSuccess={(username) => {
          setUser(username);
          setUserRole(localStorage.getItem('userRole'));
          setMenuOpen(false);
        }}
      />
    </>
  );
}
