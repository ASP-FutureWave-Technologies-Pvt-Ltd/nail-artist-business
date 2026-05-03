import { useState } from 'react';
import { SERVICES } from '../components/Services';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function AdminPage({ blockedDates, handleToggleBlock, bookings }) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [serviceFilter, setServiceFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');

    const filteredBookings = bookings
        .filter(b => {
            const matchesService = serviceFilter === 'All' || b.service === serviceFilter;
            const matchesDate = !dateFilter || b.date === dateFilter;
            return matchesService && matchesDate;
        })
        .sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

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
        const isBlocked = blockedDates.includes(dateStr);
        handleToggleBlock(dateStr, isBlocked);
    };

    const removeBlocked = (dateStr) => {
        handleToggleBlock(dateStr, true); // true = it IS blocked currently, so unblock it
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                            <h3 style={{ margin: 0 }}>📋 Recent Bookings</h3>
                        </div>

                        {/* Filters Row */}
                        <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', marginBottom: 'var(--space-md)' }}>
                            <div style={{ flex: 1, minWidth: '150px' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Filter by Service</label>
                                <select
                                    value={serviceFilter}
                                    onChange={(e) => setServiceFilter(e.target.value)}
                                    style={{ width: '100%', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                                >
                                    <option value="All">All Services</option>
                                    {SERVICES.map((s, idx) => (
                                        <option key={idx} value={s.name}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ flex: 1, minWidth: '150px' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: 4 }}>Filter by Date</label>
                                <input
                                    type="date"
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    style={{ width: '100%', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }}
                                />
                            </div>

                            <div style={{ alignSelf: 'flex-end' }}>
                                <button
                                    onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                                    style={{ padding: '7px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', background: 'white', fontSize: '0.8rem', cursor: 'pointer', height: 'fit-content' }}
                                >
                                    {sortOrder === 'asc' ? '📅 Oldest First' : '📅 Newest First'}
                                </button>
                            </div>
                        </div>

                        {filteredBookings.length === 0 ? (
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>No bookings found matching your filters.</p>
                        ) : (
                            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                                {filteredBookings.map((b, i) => (
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

