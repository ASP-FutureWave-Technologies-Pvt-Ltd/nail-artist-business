import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h3>💅 Sofi Luxe Nails</h3>
                        <p>
                            Premium nail art studio offering luxury manicures, pedicures,
                            nail extensions, and bespoke bridal nail art. Your nails, our canvas.
                        </p>
                    </div>

                    <div>
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><Link to="/gallery">Gallery</Link></li>
                            <li><Link to="/booking">Book Now</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4>Services</h4>
                        <ul className="footer-links">
                            <li><a href="#services">Gel Polish</a></li>
                            <li><a href="#services">Acrylic Nails</a></li>
                            <li><a href="#services">Nail Extensions</a></li>
                            <li><a href="#services">Bridal Nail Art</a></li>
                            <li><a href="#services">Custom Designs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4>Contact</h4>
                        <ul className="footer-links">
                            <li><a href="tel:+918610556720">+91 86105 56720</a></li>
                            <li><a href="mailto:hello@sofiluxenails.in">hello@sofiluxenails.in</a></li>
                            <li><a href="#">Poonamallee, Chennai</a></li>
                            <li><a href="#">Mon-Sat: 10AM–8PM</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Sofi Luxe Nails. All rights reserved.</p>
                    <div className="footer-socials">
                        <a href="https://instagram.com/sofi.luxe.nails" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
                        <a href="https://wa.me/918610556720" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">💬</a>
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="Pinterest">📌</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
