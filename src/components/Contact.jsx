export default function Contact() {
    const phone = '919876543210'; // Replace with actual number
    const whatsappMsg = encodeURIComponent('Hi! I\'d like to book an appointment at Lumière Nails. 💅');

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
                                <p>123 Beauty Lane, Koramangala<br />Bengaluru, Karnataka 560034</p>
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
                                <p>hello@lumierenails.in</p>
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
                                href="https://instagram.com/lumiere.nails"
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
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5934!2d77.6166!3d12.9352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144f!2sKoramangala!5e0!3m2!1sen!2sin!4v1"
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
