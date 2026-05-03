import { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (!isLogin && password !== confirmPassword) {
            setMessage("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            if (isLogin) {
                // Handle Login
                const res = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: email, password })
                });
                const data = await res.json();

                if (res.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('userEmail', data.email || email);
                    localStorage.setItem('userPhone', data.phone || '');
                    localStorage.setItem('userRealName', data.username);
                    localStorage.setItem('userRole', data.role || 'customer');
                    onLoginSuccess(data.username);
                    onClose();
                } else {
                    setMessage(data.error || 'Login failed');
                }
            } else {
                // Handle Registration
                const res = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, phone, password })
                });
                const data = await res.json();

                if (res.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userRealName', name);
                    localStorage.setItem('userPhone', phone);
                    localStorage.setItem('userRole', data.role || 'customer');

                    onLoginSuccess(data.username);
                    setMessage('Registration successful!');
                    setTimeout(() => { onClose(); }, 1500);
                } else {
                    setMessage(data.error || 'Registration failed');
                }
            }
        } catch (error) {
            setMessage('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setMessage('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setPhone('');
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button style={styles.closeBtn} onClick={onClose}>×</button>

                <h2 style={{ marginBottom: 'var(--space-sm)', textAlign: 'center' }}>
                    {isLogin ? 'Welcome Back' : 'Create an Account'}
                </h2>

                {message && (
                    <div style={{ ...styles.alert, backgroundColor: message.includes('success') ? 'var(--pink-50)' : '#fee2e2', color: message.includes('success') ? 'var(--pink-600)' : '#991b1b' }}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>

                    {!isLogin && (
                        <div style={styles.row}>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone Number"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div style={styles.row}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                style={{ width: '100%' }}
                            />
                        </div>

                        {!isLogin && (
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Confirm</label>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: 'var(--space-xs)', width: '100%' }}>
                        {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
                    </button>
                </form>

                <div style={{ marginTop: 'var(--space-md)', textAlign: 'center', fontSize: '0.9rem' }}>
                    {isLogin ? "Don't have an account? " : "Already registered? "}
                    <button
                        type="button"
                        onClick={toggleMode}
                        style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        {isLogin ? 'Sign up here' : 'Login here'}
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
    },
    modal: {
        background: 'var(--color-surface)',
        padding: 'var(--space-lg)',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '550px',
        position: 'relative',
        boxShadow: 'var(--shadow-xl)',
        animation: 'slideUp 0.3s ease-out'
    },
    row: {
        display: 'flex',
        gap: 'var(--space-sm)',
        width: '100%',
        flexWrap: 'wrap'
    },
    closeBtn: {
        position: 'absolute',
        top: '15px', right: '15px',
        background: 'none', border: 'none',
        fontSize: '1.5rem', cursor: 'pointer',
        color: 'var(--color-text-secondary)',
        lineHeight: 1
    },
    alert: {
        padding: '10px',
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--space-sm)',
        fontSize: '0.9rem',
        textAlign: 'center'
    }
};

