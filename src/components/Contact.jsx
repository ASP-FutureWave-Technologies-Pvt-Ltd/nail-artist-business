export default function Contact() {
    const phone = '919876543210'; // Replace with actual number
    const whatsappMsg = encodeURIComponent('Hi! I\'d like to book an appointment at Sofi Luxe Nails. 💅');

    return (
        <section id="contact" className="section">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Get in Touch</span>
                    <h2 className="section-title">Visit Our Studio</h2>
                    <p className="section-subtitle">
                        We'd love to hear from you! Book an appointment or drop by our studio.
                    </p>
                </div>

                <div className="contact-grid">
                    <div>
                        <div className="contact-card">
                            <div className="contact-icon">📍</div>
                            <div className="contact-info">
                                <h4>Studio Address</h4>
                                <p>M S V Park Street, Poonamallee<br />Chennai, Tamil Nadu 600056</p>
                            </div>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">📞</div>
                            <div className="contact-info">
                                <h4>Phone</h4>
                                <p>+91 98765 43210</p>
                            </div>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">📧</div>
                            <div className="contact-info">
                                <h4>Email</h4>
                                <p>hello@sofiluxenails.in</p>
                            </div>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">🕐</div>
                            <div className="contact-info">
                                <h4>Working Hours</h4>
                                <p>Mon – Sat: 10:00 AM – 8:00 PM<br />Sunday: By Appointment Only</p>
                            </div>
                        </div>

                        <div className="contact-buttons-wrap" style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-md)', flexWrap: 'wrap' }}>
                            <a
                                href={`https://wa.me/${phone}?text=${whatsappMsg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp"
                            >
                                💬 Chat on WhatsApp
                            </a>
                            <a
                                href="https://instagram.com/sofi.luxe.nails"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                📸 Follow on Instagram
                            </a>
                        </div>
                    </div>

                    <div>
                        <div className="map-wrapper">
                            <iframe
                                src="https://maps.google.com/maps?q=M%20S%20V%20Park%20Street%2C%20Poonamallee%2C%20Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Studio Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
