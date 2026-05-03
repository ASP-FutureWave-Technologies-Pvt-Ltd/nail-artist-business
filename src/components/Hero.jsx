import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Hero() {
    const [stats, setStats] = useState({
        customers: '2000+',
        bookings: '3500+',
        reviews: '4.9'
    });

    useEffect(() => {
        // Fetch realtime metrics from the backend if available
        fetch(`${import.meta.env.VITE_API_URL}/api/stats`)
            .then(res => {
                if (res.ok) return res.json();
                return null;
            })
            .then(data => {
                if (data) {
                    setStats({
                        customers: `${data.customers}+`,
                        bookings: `${data.bookings}+`,
                        reviews: '4.9' // Static rating for now
                    });
                }
            })
            .catch(() => { });
    }, []);

    return (
        <section id="home" className="hero">
            <div className="container">
                <div className="hero-inner">
                    <div className="hero-content">
                        <div className="hero-badge animate-fade-up">
                            ✨ Premium Nail Studio
                        </div>
                        <h1 className="hero-title animate-fade-up d1">
                            Luxury Nail Art <br />& <span className="accent">Custom Designs</span>
                        </h1>
                        <p className="hero-desc animate-fade-up d2">
                            Transform your nails into works of art. From elegant bridal designs to trendy nail extensions — experience perfection at every touch.
                        </p>
                        <div className="hero-buttons animate-fade-up d3">
                            <Link to="/booking" className="btn btn-primary">Book Appointment</Link>
                            <a href="#services" className="btn btn-secondary">View Services</a>
                        </div>
                        <div className="hero-stats animate-fade-up d4">
                            <div className="hero-stat">
                                <strong>{stats.customers}</strong>
                                <span>Happy Clients</span>
                            </div>
                            <div className="hero-stat">
                                <strong>{stats.bookings}</strong>
                                <span>Appointments</span>
                            </div>
                            <div className="hero-stat">
                                <strong>{stats.reviews}</strong>
                                <span>⭐ Rating</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual animate-slide-right">
                        <div className="hero-image-wrapper">
                            <img
                                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop"
                                alt="Luxury nail art design"
                                className="hero-img"
                            />
                            <div className="hero-float-card top-right">
                                <div className="float-icon">💎</div>
                                <div className="float-label">Next Available</div>
                                <div className="float-value">Today, 2:00 PM</div>
                            </div>
                            <div className="hero-float-card bottom-left">
                                <div className="float-icon">⭐</div>
                                <div className="float-label">Top Rated</div>
                                <div className="float-value">4.9 / 5.0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
