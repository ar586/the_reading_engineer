'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/stories', label: 'Stories' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/analyses', label: 'Analysis' },
    { href: '/stats', label: 'Library Stats' },
    { href: '/about', label: 'About' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div style={{ backgroundColor: 'var(--overlay-white)', padding: '1rem 0 0.5rem 0' }}>
            <nav className="navbar container" style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0, paddingTop: '0.5rem' }}>
                <Link href="/" className="navbar-brand" style={{ color: 'var(--bg-secondary)' }}>
                    The Reading Engineer
                </Link>
                <ul className="nav-links">
                    {links.map(({ href, label }) => {
                        const isActive = pathname === href || pathname.startsWith(href + '/');
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="nav-link"
                                    style={{
                                        color: isActive ? 'var(--accent-color)' : 'var(--bg-secondary)',
                                        fontWeight: isActive ? '700' : '500',
                                    }}
                                >
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
