export default function About() {
    return (
        <section id="about" className="section">
            <div className="container">
                <div className="about-grid">
                    <div className="about-image-wrapper animate-slide-left">
                        <img
                            src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop"
                            alt="Nail artist at work"
                            className="about-image"
                        />
                    </div>

                    <div className="about-content animate-slide-right">
                        <span className="section-label">About Me</span>
                        <h2 className="section-title">Crafting Beauty, One Nail at a Time</h2>
                        <p className="about-text">
                            Hi, I'm Priya — a certified nail artist with over 8 years of experience in creating stunning
                            nail designs. From classic French tips to intricate 3D nail art, I pour creativity and precision
                            into every set. My studio is a safe, hygienic, and relaxing space designed for you to
                            unwind while I transform your nails.
                        </p>
                        <p className="about-text">
                            Trained in advanced gel techniques and nail extensions from internationally recognized programs,
                            I stay updated with the latest trends to bring you the finest nail artistry.
                        </p>

                        <div className="about-badges">
                            <div className="about-badge">🎓 Certified Nail Technician</div>
                            <div className="about-badge">🏆 8+ Years Experience</div>
                            <div className="about-badge">💅 Gel & Acrylic Specialist</div>
                            <div className="about-badge">🌿 Non-Toxic Products</div>
                            <div className="about-badge">👰 Bridal Specialist</div>
                        </div>

                        <a href="#contact" className="btn btn-primary">Get in Touch</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
