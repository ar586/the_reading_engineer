'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const res = await fetch('/api/admin/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push('/admin');
            router.refresh();
        } else {
            setError('Wrong password. This is a private area.');
            setLoading(false);
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-primary)',
            padding: '2rem'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                {/* Lock icon */}
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid var(--accent-color)', backgroundColor: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>

                <h1 style={{ fontSize: '1.8rem', color: 'var(--overlay-white)', marginBottom: '0.5rem' }}>Private Access</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                    This dashboard is only for the author.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoFocus
                        style={{ textAlign: 'center', letterSpacing: '0.2em', fontSize: '1rem' }}
                    />
                    {error && (
                        <p style={{ color: 'var(--accent-red)', fontSize: '0.85rem', margin: 0 }}>{error}</p>
                    )}
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={{ opacity: loading ? 0.6 : 1 }}
                    >
                        {loading ? 'Checking...' : 'Enter Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
}
