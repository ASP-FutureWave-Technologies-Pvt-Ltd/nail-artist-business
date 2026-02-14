import { Link } from 'react-router-dom';

const SERVICES = [
    {
        icon: '💅',
        name: 'Gel Polish',
        desc: 'Long-lasting, chip-free gel polish with a flawless glossy or matte finish. Includes nail prep, cuticle care, and top coat.',
        price: '₹800',
        duration: '45 min',
    },
    {
        icon: '💎',
        name: 'Acrylic Nails',
        desc: 'Durable acrylic nail extensions sculpted to your desired shape and length. Perfect for strong, long-lasting nails.',
        price: '₹1,500',
        duration: '1.5 hrs',
    },
    {
        icon: '✨',
        name: 'Nail Extensions',
        desc: 'Lightweight gel or fiberglass extensions for natural-looking length. Includes shaping and polish of your choice.',
        price: '₹2,000',
        duration: '2 hrs',
    },
    {
        icon: '👰',
        name: 'Bridal Nail Art',
        desc: 'Bespoke bridal designs with premium stones, glitter, foils, and hand-painted details. Includes trial session.',
        price: '₹3,500',
        duration: '2.5 hrs',
    },
    {
        icon: '🎨',
        name: 'Custom Nail Designs',
        desc: 'Unique hand-painted designs, 3D art, chrome, ombré, marble effects and more. Your imagination is the limit.',
        price: '₹1,200',
        duration: '1–2 hrs',
    },
    {
        icon: '🧴',
        name: 'Nail Removal',
        desc: 'Safe, gentle removal of gel, acrylic, or dip powder nails. Includes nail restoration and moisturizing treatment.',
        price: '₹500',
        duration: '30 min',
    },
];

export default function Services() {
    return (
        <section id="services" className="section section-alt">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Our Services</span>
                    <h2 className="section-title">Luxury Treatments for Every Occasion</h2>
                    <p className="section-subtitle">
                        We use only premium, non-toxic products to ensure your nails are not only beautiful but healthy. Every service includes complimentary beverage.
                    </p>
                </div>

                <div className="services-grid">
                    {SERVICES.map((s, i) => (
                        <div key={i} className="service-card">
                            <div className="service-icon">{s.icon}</div>
                            <h3 className="service-name">{s.name}</h3>
                            <p className="service-desc">{s.desc}</p>
                            <div className="service-meta">
                                <div>
                                    <div className="service-price">
                                        {s.price} <span>onwards</span>
                                    </div>
                                </div>
                                <div className="service-duration">🕐 {s.duration}</div>
                            </div>
                            <Link
                                to="/booking"
                                className="btn btn-primary btn-sm"
                                style={{ marginTop: 'var(--space-md)', width: '100%' }}
                            >
                                Book Now
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export { SERVICES };
