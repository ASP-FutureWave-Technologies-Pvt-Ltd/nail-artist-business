export default function InstagramPreview() {
    const images = [
        'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583521214690-73421a1829a9?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571290274554-6a2eaa74d75b?q=80&w=400&auto=format&fit=crop',
    ];

    return (
        <section className="section insta-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">📸 Follow Us</span>
                    <h2 className="section-title">@lumiere.nails</h2>
                    <p className="section-subtitle">
                        Get inspired by our latest creations. Follow us on Instagram for daily nail art inspo!
                    </p>
                </div>
            </div>
            <div className="insta-grid">
                {images.map((src, i) => (
                    <div key={i} className="insta-item">
                        <img src={src} alt={`Nail art design ${i + 1}`} loading="lazy" />
                        <div className="insta-overlay">♥</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
