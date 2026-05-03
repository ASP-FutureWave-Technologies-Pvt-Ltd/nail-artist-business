import { useState, useMemo, useEffect } from 'react';
import { SERVICES } from './Services';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const TIME_SLOTS = {
    morning: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    afternoon: ['12:00 PM', '12:30 PM', '1:00 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
    evening: ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'],
};



export default function BookingSystem({ user, blockedDates = [], onBook, bookings = [] }) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [form, setForm] = useState({
        name: localStorage.getItem('userRealName') || localStorage.getItem('username') || '',
        phone: localStorage.getItem('userPhone') || '',
        email: localStorage.getItem('userEmail') || '',
        notes: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [user_prop] = [user]; // Rename internally if needed

    useEffect(() => {
        setForm({
            name: localStorage.getItem('userRealName') || localStorage.getItem('username') || '',
            phone: localStorage.getItem('userPhone') || '',
            email: localStorage.getItem('userEmail') || '',
            notes: ''
        });
    }, [user]);

    useEffect(() => {
        if (submitted) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [submitted]);

    // Compute booked slots from bookings prop
    const bookedSlots = useMemo(() => {
        const slots = {};
        bookings.forEach(b => {
            if (!slots[b.date]) slots[b.date] = [];
            slots[b.date].push(b.time);
        });
        return slots;
    }, [bookings]);

    // Generate calendar days
    const calendarDays = useMemo(() => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const days = [];

        for (let i = 0; i < firstDay; i++) days.push(null);
        for (let d = 1; d <= daysInMonth; d++) days.push(d);

        return days;
    }, [currentMonth, currentYear]);

    const formatDate = (day) => {
        const m = String(currentMonth + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${currentYear}-${m}-${d}`;
    };

    const isBlocked = (day) => {
        if (!day) return false;
        return blockedDates.includes(formatDate(day));
    };

    const isPast = (day) => {
        if (!day) return false;
        const date = new Date(currentYear, currentMonth, day);
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return date < todayStart;
    };

    const isToday = (day) => {
        return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
    };

    const isBooked = (day) => {
        if (!day) return false;
        const dateStr = formatDate(day);
        const bookedTimes = bookedSlots[dateStr] || [];
        const allSlots = [...TIME_SLOTS.morning, ...TIME_SLOTS.afternoon, ...TIME_SLOTS.evening];
        return bookedTimes.length >= allSlots.length;
    };

    const isSlotBooked = (time) => {
        if (!selectedDate) return false;
        const dateStr = formatDate(selectedDate);
        return (bookedSlots[dateStr] || []).includes(time);
    };

    const prevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
        else setCurrentMonth(m => m - 1);
    };

    const nextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
        else setCurrentMonth(m => m + 1);
    };

    const handleDayClick = (day) => {
        if (!day || isPast(day) || isBlocked(day) || isBooked(day)) return;
        setSelectedDate(day);
        setSelectedTime('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime || !selectedService || !form.name || !form.phone) return;

        const booking = {
            date: formatDate(selectedDate),
            time: selectedTime,
            service: selectedService,
            ...form,
        };

        if (onBook) onBook(booking);
        setSubmitted(true);
    };

    const getServicePrice = () => {
        const svc = SERVICES.find(s => s.name === selectedService);
        return svc ? svc.price : '';
    };

    const phone = '919876543210';
    const whatsappConfirmation = () => {
        const dateStr = selectedDate ? `${selectedDate} ${MONTHS[currentMonth]} ${currentYear}` : '';
        const msg = encodeURIComponent(
            `Hi! I'd like to confirm my booking:\n📅 Date: ${dateStr}\n⏰ Time: ${selectedTime}\n💅 Service: ${selectedService}\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}`
        );
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    };

    if (submitted) {
        return (
            <section className="section booking-section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', paddingTop: 'var(--nav-height)' }}>
                <div className="container" style={{ maxWidth: 600, textAlign: 'center', padding: 'var(--space-xl) var(--space-md)', margin: '0 auto' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: 'var(--space-sm)' }}>🎉</div>
                    <h2 style={{ fontSize: '2.2rem', marginBottom: 'var(--space-sm)', color: 'var(--color-primary)' }}>Booking Confirmed!</h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)', fontSize: '1rem', lineHeight: '1.6' }}>
                        Thank you, <strong>{form.name}</strong>! Your appointment for <strong>{selectedService}</strong> on{' '}
                        <strong>{selectedDate} {MONTHS[currentMonth]} {currentYear}</strong> at <strong>{selectedTime}</strong> has been booked.
                    </p>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-lg)' }}>
                        We've saved your details for next time. We'll send you a reminder shortly!
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-whatsapp" onClick={whatsappConfirmation}>
                            💬 Confirm on WhatsApp
                        </button>
                        <button className="btn btn-secondary" onClick={() => {
                            setSubmitted(false);
                            setSelectedDate(null);
                            setSelectedTime('');
                            setForm({
                                name: localStorage.getItem('userRealName') || localStorage.getItem('username') || '',
                                phone: localStorage.getItem('userPhone') || '',
                                email: localStorage.getItem('userEmail') || '',
                                notes: ''
                            });
                        }}>
                            Book Another
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section booking-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Book Your Visit</span>
                    <h2 className="section-title">Appointment Booking</h2>
                    <p className="section-subtitle">
                        Select your preferred date, time, and service. We'll confirm your appointment via WhatsApp.
                    </p>
                </div>

                <div className="booking-layout">
                    {/* Calendar & Time Slots */}
                    <div>
                        <div className="calendar-wrapper">
                            <div className="calendar-header">
                                <h3>{MONTHS[currentMonth]} {currentYear}</h3>
                                <div className="calendar-nav">
                                    <button onClick={prevMonth} aria-label="Previous month">‹</button>
                                    <button onClick={nextMonth} aria-label="Next month">›</button>
                                </div>
                            </div>

                            <div className="calendar-grid">
                                {DAYS.map(d => (
                                    <div key={d} className="calendar-day-label">{d}</div>
                                ))}
                                {calendarDays.map((day, i) => (
                                    <div
                                        key={i}
                                        className={`calendar-day 
                      ${!day ? 'disabled' : ''} 
                      ${day && isPast(day) ? 'disabled' : ''} 
                      ${day && isBlocked(day) ? 'blocked' : ''} 
                      ${day && isBooked(day) ? 'booked' : ''} 
                      ${day && isToday(day) ? 'today' : ''} 
                      ${day === selectedDate ? 'selected' : ''}`}
                                        onClick={() => handleDayClick(day)}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Time Slots */}
                        {selectedDate && (
                            <div className="time-slots" style={{ marginTop: 'var(--space-lg)' }}>
                                <h4>Available Time Slots — {selectedDate} {MONTHS[currentMonth]}</h4>

                                {Object.entries(TIME_SLOTS).map(([period, slots]) => (
                                    <div key={period} className="slots-group">
                                        <div className="slots-group-label">
                                            {period === 'morning' ? '🌅 Morning' : period === 'afternoon' ? '☀️ Afternoon' : '🌙 Evening'}
                                        </div>
                                        <div className="slots-list">
                                            {slots.map(slot => (
                                                <button
                                                    key={slot}
                                                    className={`slot-btn ${selectedTime === slot ? 'selected' : ''}`}
                                                    disabled={isSlotBooked(slot)}
                                                    onClick={() => setSelectedTime(slot)}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Booking Form */}
                    <div className="booking-form-card">
                        <h3>Your Booking Details</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Service *</label>
                                <select
                                    value={selectedService}
                                    onChange={e => setSelectedService(e.target.value)}
                                    required
                                >
                                    <option value="">Select a service...</option>
                                    {SERVICES.map((s, i) => (
                                        <option key={i} value={s.name}>{s.name} — {s.price}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Your Name *</label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={form.phone}
                                    onChange={e => setForm({ ...form, phone: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Special Requests</label>
                                <textarea
                                    rows="3"
                                    placeholder="Any specific design preferences..."
                                    value={form.notes}
                                    onChange={e => setForm({ ...form, notes: e.target.value })}
                                    style={{ resize: 'vertical' }}
                                />
                            </div>

                            {/* Booking Summary */}
                            {(selectedDate || selectedTime || selectedService) && (
                                <div className="booking-summary">
                                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xs)' }}>
                                        Summary
                                    </h4>
                                    {selectedDate && (
                                        <div className="booking-summary-row">
                                            <span>📅 Date</span>
                                            <strong>{selectedDate} {MONTHS[currentMonth]} {currentYear}</strong>
                                        </div>
                                    )}
                                    {selectedTime && (
                                        <div className="booking-summary-row">
                                            <span>⏰ Time</span>
                                            <strong>{selectedTime}</strong>
                                        </div>
                                    )}
                                    {selectedService && (
                                        <div className="booking-summary-row">
                                            <span>💅 Service</span>
                                            <strong>{selectedService}</strong>
                                        </div>
                                    )}
                                    {selectedService && (
                                        <div className="booking-summary-row total">
                                            <span>Total</span>
                                            <strong>{getServicePrice()} onwards</strong>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Payment Option */}
                            <div style={{ marginBottom: 'var(--space-md)' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', fontSize: '0.9rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={showPayment}
                                        onChange={e => setShowPayment(e.target.checked)}
                                        style={{ width: 18, height: 18, accentColor: 'var(--color-primary)' }}
                                    />
                                    Pay ₹200 advance to confirm booking
                                </label>
                                {showPayment && (
                                    <div style={{ marginTop: 'var(--space-sm)', padding: 'var(--space-sm)', background: 'var(--pink-50)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                        💳 Payment options: UPI (GPay/PhonePe), Card, Net Banking<br />
                                        <em>You'll be redirected to secure payment after confirmation.</em>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ width: '100%' }}
                                disabled={!selectedDate || !selectedTime || !selectedService || !form.name || !form.phone}
                            >
                                Confirm Booking
                            </button>

                            <p style={{ textAlign: 'center', marginTop: 'var(--space-sm)', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                                Free cancellation up to 24 hours before appointment
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
