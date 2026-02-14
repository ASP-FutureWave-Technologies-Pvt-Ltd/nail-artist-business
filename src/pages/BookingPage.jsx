import BookingSystem from '../components/BookingSystem';

export default function BookingPage({ blockedDates, onBook, bookings }) {
    return (
        <div style={{ paddingTop: 'var(--nav-height)' }}>
            <BookingSystem blockedDates={blockedDates} onBook={onBook} bookings={bookings} />
        </div>
    );
}
