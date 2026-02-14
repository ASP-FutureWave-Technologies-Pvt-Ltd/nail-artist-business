import { useState } from 'react';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function AdminPage({ blockedDates, setBlockedDates, bookings }) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const calendarDays = (() => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const days = [];
        for (let i = 0; i < firstDay; i++) days.push(null);
        for (let d = 1; d <= daysInMonth; d++) days.push(d);
        return days;
    })();

    const formatDate = (day) => {
        const m = String(currentMonth + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${currentYear}-${m}-${d}`;
    };

    const toggleBlock = (day) => {
        if (!day) return;
        const dateStr = formatDate(day);
        if (blockedDates.includes(dateStr)) {
            setBlockedDates(blockedDates.filter(d => d !== dateStr));
        } else {
            setBlockedDates([...blockedDates, dateStr]);
        }
    };

    const removeBlocked = (dateStr) => {
        setBlockedDates(blockedDates.filter(d => d !== dateStr));
    };

    const prevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
        else setCurrentMonth(m => m - 1);
    };

    const nextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
        else setCurrentMonth(m => m + 1);
    };

    return (
        <div className="admin-section">
            <div className="container">
                <div className="admin-header">
                    <div>
                        <h2 style={{ marginBottom: 4 }}>Admin Panel</h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Manage bookings and blocked dates</p>
                    </div>
                </div>

                <div className="admin-grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)' }}>
                    {/* Block Dates */}
                    <div className="admin-card">
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>📅 Block / Unblock Dates</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
                            Click on dates to block or unblock them from bookings.
                        </p>

                        <div className="calendar-wrapper" style={{ background: 'var(--color-surface)' }}>
                            <div className="calendar-header">
                                <h3 style={{ fontSize: '1.1rem' }}>{MONTHS[currentMonth]} {currentYear}</h3>
                                <div className="calendar-nav">
                                    <button onClick={prevMonth}>‹</button>
                                    <button onClick={nextMonth}>›</button>
                                </div>
                            </div>
                            <div className="calendar-grid">
                                {DAYS.map(d => <div key={d} className="calendar-day-label">{d}</div>)}
                                {calendarDays.map((day, i) => (
                                    <div
                                        key={i}
                                        className={`calendar-day ${!day ? 'disabled' : ''} ${day && blockedDates.includes(formatDate(day)) ? 'blocked' : ''}`}
                                        onClick={() => toggleBlock(day)}
                                        style={{ cursor: day ? 'pointer' : 'default' }}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {blockedDates.length > 0 && (
                            <div style={{ marginTop: 'var(--space-md)' }}>
                                <h4 style={{ fontSize: '0.9rem', marginBottom: 'var(--space-xs)' }}>Blocked Dates:</h4>
                                <div className="blocked-dates-list">
                                    {blockedDates.sort().map(d => (
                                        <div key={d} className="blocked-date-tag">
                                            {d}
                                            <button onClick={() => removeBlocked(d)}>×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bookings List */}
                    <div className="admin-card">
                        <h3 style={{ marginBottom: 'var(--space-md)' }}>📋 Recent Bookings</h3>
                        {bookings.length === 0 ? (
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>No bookings yet. Bookings will appear here once customers start booking.</p>
                        ) : (
                            <div>
                                {bookings.map((b, i) => (
                                    <div key={i} style={{
                                        padding: 'var(--space-md)',
                                        background: 'var(--color-surface)',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        marginBottom: 'var(--space-sm)',
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <strong>{b.name}</strong>
                                            <span style={{ fontSize: '0.8rem', padding: '2px 10px', background: 'var(--pink-50)', borderRadius: 'var(--radius-full)', color: 'var(--pink-500)', fontWeight: 600 }}>
                                                {b.service}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                            📅 {b.date} &nbsp; ⏰ {b.time}<br />
                                            📞 {b.phone} &nbsp; 📧 {b.email || '—'}
                                        </div>
                                        {b.notes && <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: 4 }}>📝 {b.notes}</div>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
