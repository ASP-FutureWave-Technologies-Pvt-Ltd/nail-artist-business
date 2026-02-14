import { useState } from 'react';

const GALLERY_IMAGES = [
    { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop', category: 'Bridal', label: 'Elegant Bridal Set' },
    { src: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=600&auto=format&fit=crop', category: 'Minimal', label: 'Nude Minimalist' },
    { src: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop', category: 'Party', label: 'Glitter Party Nails' },
    { src: 'https://images.unsplash.com/photo-1583521214690-73421a1829a9?q=80&w=600&auto=format&fit=crop', category: 'French Tips', label: 'Classic French Tips' },
    { src: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=600&auto=format&fit=crop', category: '3D', label: '3D Floral Art' },
    { src: 'https://images.unsplash.com/photo-1571290274554-6a2eaa74d75b?q=80&w=600&auto=format&fit=crop', category: 'Minimal', label: 'Pastel Ombre' },
    { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop', category: 'Bridal', label: 'Royal Wedding Set' },
    { src: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=600&auto=format&fit=crop', category: 'Party', label: 'Chrome Nails' },
    { src: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop', category: 'French Tips', label: 'Colored French' },
    { src: 'https://images.unsplash.com/photo-1583521214690-73421a1829a9?q=80&w=600&auto=format&fit=crop', category: '3D', label: 'Crystal Embellishment' },
    { src: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=600&auto=format&fit=crop', category: 'Minimal', label: 'Soft Pink Classic' },
    { src: 'https://images.unsplash.com/photo-1571290274554-6a2eaa74d75b?q=80&w=600&auto=format&fit=crop', category: 'Party', label: 'Holographic Nails' },
];

const BEFORE_AFTER = [
    {
        before: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=400&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400&auto=format&fit=crop',
        title: 'Gel Extension Transformation',
        desc: 'From short, damaged nails to stunning gel extensions with marble art.',
    },
    {
        before: 'https://images.unsplash.com/photo-1571290274554-6a2eaa74d75b?q=80&w=400&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=400&auto=format&fit=crop',
        title: 'Bridal Makeover',
        desc: 'Complete bridal nail makeover with custom 3D floral design and crystals.',
    },
    {
        before: 'https://images.unsplash.com/photo-1583521214690-73421a1829a9?q=80&w=400&auto=format&fit=crop',
        after: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=400&auto=format&fit=crop',
        title: 'Nail Repair & Art',
        desc: 'Damaged acrylic removal and restoration with fresh ombre design.',
    },
];

const CATEGORIES = ['All', 'Bridal', 'Party', 'Minimal', '3D', 'French Tips'];

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = activeCategory === 'All'
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter(img => img.category === activeCategory);

    return (
        <div style={{ paddingTop: 'var(--nav-height)' }}>
            {/* Gallery Section */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Portfolio</span>
                        <h2 className="section-title">Our Nail Art Gallery</h2>
                        <p className="section-subtitle">
                            Browse through our collection of stunning nail art designs. Each set is uniquely crafted with care and precision.
                        </p>
                    </div>

                    <div className="gallery-categories">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="gallery-grid">
                        {filtered.map((img, i) => (
                            <div key={i} className="gallery-item">
                                <img src={img.src} alt={img.label} loading="lazy" />
                                <div className="gallery-overlay">
                                    <div className="gallery-overlay-text">
                                        <div>{img.label}</div>
                                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>{img.category}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Before & After */}
            <section className="section section-alt">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Transformations</span>
                        <h2 className="section-title">Before & After</h2>
                        <p className="section-subtitle">
                            See the magic happen. Real transformations from our studio.
                        </p>
                    </div>

                    <div className="ba-grid">
                        {BEFORE_AFTER.map((item, i) => (
                            <div key={i} className="ba-card">
                                <div className="ba-images">
                                    <div className="ba-side">
                                        <img src={item.before} alt="Before" />
                                        <div className="ba-label">Before</div>
                                    </div>
                                    <div className="ba-side">
                                        <img src={item.after} alt="After" />
                                        <div className="ba-label" style={{ background: 'rgba(212,165,165,0.8)' }}>After</div>
                                    </div>
                                </div>
                                <div className="ba-card-content">
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{item.title}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
