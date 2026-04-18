import Link from 'next/link';

export default function Navbar() {
    return (
        <div style={{ backgroundColor: 'var(--overlay-white)' }}>
            <nav className="navbar container" style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
                <Link href="/" className="navbar-brand" style={{ color: 'var(--bg-secondary)' }}>
                    The Reading Engineer
                </Link>
                <ul className="nav-links">
                    <li>
                        <Link href="/stories" className="nav-link" style={{ color: 'var(--bg-secondary)' }}>Stories</Link>
                    </li>
                    <li>
                        <Link href="/reviews" className="nav-link" style={{ color: 'var(--bg-secondary)' }}>Reviews</Link>
                    </li>
                    <li>
                        <Link href="/analyses" className="nav-link" style={{ color: 'var(--bg-secondary)' }}>Analyses</Link>
                    </li>
                    <li>
                        <Link href="/stats" className="nav-link" style={{ color: 'var(--accent-color)' }}>Library Stats</Link>
                    </li>
                    <li>
                        <Link href="/about" className="nav-link" style={{ color: 'var(--bg-secondary)' }}>About</Link>
                    </li>
                    <li>
                        <Link href="/admin" className="nav-link" style={{ color: 'var(--accent-red-hover)', fontWeight: 'bold' }}>Dashboard</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
