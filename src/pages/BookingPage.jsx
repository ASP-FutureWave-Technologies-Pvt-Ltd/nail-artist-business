import BookingSystem from '../components/BookingSystem';

export default function BookingPage({ blockedDates, onBook }) {
    return (
        <div style={{ paddingTop: 'var(--nav-height)' }}>
            <BookingSystem blockedDates={blockedDates} onBook={onBook} />
        </div>
    );
}
