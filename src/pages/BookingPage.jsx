import BookingSystem from '../components/BookingSystem';

export default function BookingPage({ user, blockedDates, onBook, bookings }) {
    return (
        <div style={{ paddingTop: 'var(--nav-height)' }}>
            <BookingSystem user={user} blockedDates={blockedDates} onBook={onBook} bookings={bookings} />
        </div>
    );
}
