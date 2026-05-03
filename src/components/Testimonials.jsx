import { useState, useEffect } from 'react';

export default function Testimonials({ user }) {
    const [reviews, setReviews] = useState([]);
    const [myReview, setMyReview] = useState({ rating: 5, content: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchReviews();
        if (user) fetchMyReview();
    }, [user]);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/testimonials`);
            const data = await res.json();
            if (Array.isArray(data)) setReviews(data);
        } catch (e) { console.error(e); }
    };

    const fetchMyReview = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/testimonials/my-review`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await res.json();
            if (data) setMyReview(data);
        } catch (e) { console.error(e); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/testimonials`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(myReview)
            });
            if (res.ok) {
                setMsg('Review saved successfully! ✨');
                setIsEditing(false);
                fetchReviews();
                fetchMyReview();
            }
        } catch (e) { setMsg('Error saving review.'); }
        setLoading(false);
    };

    const renderStars = (count) => '★'.repeat(count) + '☆'.repeat(5 - count);

    return (
        <section id="testimonials" className="section section-alt">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Testimonials</span>
                    <h2 className="section-title">What Our Clients Say</h2>
                    <p className="section-subtitle">
                        Real stories from our lovely clients. Experience the art of perfection.
                    </p>
                </div>

                {reviews.length > 0 ? (
                    <div className="testimonials-grid">
                        {reviews.map((r, i) => (
                            <div key={i} className="testimonial-card">
                                <div className="quote-mark">"</div>
                                <div className="stars">{renderStars(r.rating)}</div>
                                <p className="testimonial-text">{r.content}</p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">{r.name ? r.name[0] : '👤'}</div>
                                    <div className="testimonial-author-info">
                                        <h4>{r.name}</h4>
                                        <span>Verified Client</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ textAlign: 'center', color: 'var(--color-text-tertiary)' }}>Experience the magic. Be the first to share your story!</p>
                )}

                {user && (
                    <div className="review-form-container" style={{ marginTop: 'var(--space-xl)', maxWidth: '600px', margin: 'var(--space-xl) auto 0' }}>
                        <div className="admin-card" style={{ padding: 'var(--space-lg)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                                <h3>{myReview.id ? 'Modify Your Review' : 'Share Your Experience'}</h3>
                                {!isEditing && myReview.id && (
                                    <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(true)}>Edit</button>
                                )}
                            </div>

                            {(isEditing || !myReview.id) ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Your Rating</label>
                                        <div className="stars-input" style={{ fontSize: '1.5rem', color: 'var(--color-primary)', cursor: 'pointer', marginBottom: 'var(--space-sm)' }}>
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <span key={num} onClick={() => setMyReview({ ...myReview, rating: num })}>
                                                    {myReview.rating >= num ? '★' : '☆'}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Comment</label>
                                        <textarea
                                            required
                                            rows="3"
                                            value={myReview.content}
                                            onChange={e => setMyReview({ ...myReview, content: e.target.value })}
                                            placeholder="Tell us about your service..."
                                            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                                        />
                                    </div>
                                    {msg && <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '10px' }}>{msg}</p>}
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button type="submit" className="btn btn-primary" disabled={loading}>
                                            {loading ? 'Saving...' : 'Submit Review'}
                                        </button>
                                        {myReview.id && (
                                            <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                                        )}
                                    </div>
                                </form>
                            ) : (
                                <div style={{ borderLeft: '3px solid var(--color-primary)', paddingLeft: '15px' }}>
                                    <div className="stars">{renderStars(myReview.rating)}</div>
                                    <p style={{ fontStyle: 'italic', margin: '8px 0' }}>"{myReview.content}"</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>You have already rated us. Thank you!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
