export default function Testimonials() {
    const reviews = [
        {
            name: 'Antony Nivin',
            service: 'Bridal Nail Art',
            rating: 5,
            text: 'Absolutely stunning bridal nails! Priya understood exactly what I wanted and exceeded my expectations. The 3D floral design was a masterpiece. All my guests kept complimenting my nails!',
            avatar: '👰',
        },
        {
            name: 'Riya Patel',
            service: 'Gel Polish',
            rating: 5,
            text: 'I\'ve been coming here for 2 years and the quality is always top-notch. The gel polish lasts 3+ weeks without chipping. The studio is so clean and relaxing. Love it!',
            avatar: '💁‍♀️',
        },
        {
            name: 'Meera Kapoor',
            service: 'Nail Extensions',
            rating: 5,
            text: 'Best nail extensions I\'ve ever had! They look so natural and feel incredibly lightweight. Priya is a true artist. The attention to detail is remarkable.',
            avatar: '👩',
        },
        {
            name: 'Tanya Gupta',
            service: 'Custom Nail Designs',
            rating: 4,
            text: 'Got the most gorgeous marble effect nails for my engagement party. Everyone thought they were done at a luxury salon abroad! Will definitely be back for more.',
            avatar: '💅',
        },
        {
            name: 'Sneha Iyer',
            service: 'Acrylic Nails',
            rating: 5,
            text: 'The acrylics are so perfectly shaped and the color matching is impeccable. Priya takes her time to make everything perfect. Best nail artist in the city!',
            avatar: '✨',
        },
        {
            name: 'Kavya Reddy',
            service: 'Bridal Package',
            rating: 5,
            text: 'Booked the complete bridal package for me and my bridesmaids. Every single set was uniquely beautiful. Made our pre-wedding photoshoot extra special!',
            avatar: '🌸',
        },
    ];

    const renderStars = (count) => '★'.repeat(count) + '☆'.repeat(5 - count);

    return (
        <section id="testimonials" className="section section-alt">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Testimonials</span>
                    <h2 className="section-title">What Our Clients Say</h2>
                    <p className="section-subtitle">
                        Over 2000+ happy clients and counting. Here's what they love about us.
                    </p>
                </div>

                <div className="testimonials-grid">
                    {reviews.map((r, i) => (
                        <div key={i} className="testimonial-card">
                            <div className="quote-mark">"</div>
                            <div className="stars">{renderStars(r.rating)}</div>
                            <p className="testimonial-text">{r.text}</p>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">{r.avatar}</div>
                                <div className="testimonial-author-info">
                                    <h4>{r.name}</h4>
                                    <span>{r.service}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
