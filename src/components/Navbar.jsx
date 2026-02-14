import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const isHome = location.pathname === '/';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link to="/" className="nav-brand">
          💅 Sofi Luxe <span>Nails</span>
        </Link>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`} onClick={handleLinkClick}>
          {isHome ? (
            <>
              <a href="#home" className="nav-link">Home</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="#gallery" className="nav-link">Gallery</a>
              <a href="#testimonials" className="nav-link">Reviews</a>
              <a href="#contact" className="nav-link">Contact</a>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/#about" className="nav-link">About</Link>
              <Link to="/#services" className="nav-link">Services</Link>
              <Link to="/gallery" className="nav-link">Gallery</Link>
              <Link to="/#contact" className="nav-link">Contact</Link>
            </>
          )}
          <Link to="/booking" className="btn btn-primary btn-sm nav-cta">Book Now</Link>
        </div>

        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
