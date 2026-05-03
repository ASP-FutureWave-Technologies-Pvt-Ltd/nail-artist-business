import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import GalleryPage from './pages/GalleryPage';
import AdminPage from './pages/AdminPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);
  return null;
}

function App() {
  const [blockedDates, setBlockedDates] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(localStorage.getItem('username'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  // Fetch data from backend on load
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/blocked-dates`)
      .then(res => {
        if (res.ok) return res.json();
        return [];
      })
      .then(data => setBlockedDates(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching blocked dates:", err));

    // Note: In a real app, /api/admin/bookings requires JWT auth, but we'll fetch anyway
    // If you add Auth headers, you'd insert them here.
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/bookings`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
    })
      .then(res => {
        if (res.ok) return res.json();
        return [];
      })
      .then(data => {
        if (!data || !Array.isArray(data)) return;
        const mapped = data.map(b => {
          let timeFormatted = b.booking_time;
          if (timeFormatted && !timeFormatted.includes('AM') && !timeFormatted.includes('PM')) {
            const [h, m] = timeFormatted.split(':');
            const hour = parseInt(h, 10);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hr12 = hour % 12 || 12;
            timeFormatted = `${hr12}:${m} ${ampm}`;
          }
          return {
            ...b,
            date: b.booking_date,
            time: timeFormatted
          };
        });
        setBookings(mapped);
      })
      .catch(err => console.error("Error fetching bookings:", err));
  }, []);

  const handleBook = async (booking) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          service: booking.service,
          booking_date: booking.date,
          booking_time: booking.time,
        })
      });

      if (response.ok) {
        const newBooking = await response.json();
        setBookings(prev => [
          { ...booking, id: newBooking.id },
          ...prev
        ]);
      } else {
        const err = await response.json();
        alert(err.error || "Failed to book");
      }
    } catch (e) {
      alert("Error talking to server");
    }
  };

  const handleToggleBlockDate = async (dateStr, isBlocked) => {
    try {
      if (isBlocked) {
        // Unblock
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/blocked-dates/${dateStr}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
        });
        if (res.ok) setBlockedDates(prev => prev.filter(d => d !== dateStr));
      } else {
        // Block
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/blocked-dates`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          },
          body: JSON.stringify({ blocked_date: dateStr, reason: 'Admin blocked' })
        });
        if (res.ok) setBlockedDates(prev => [...prev, dateStr]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar user={user} setUser={setUser} userRole={userRole} setUserRole={setUserRole} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/booking" element={<BookingPage user={user} blockedDates={blockedDates} bookings={bookings} onBook={handleBook} />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/admin" element={<AdminPage user={user} blockedDates={blockedDates} handleToggleBlock={handleToggleBlockDate} bookings={bookings} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
