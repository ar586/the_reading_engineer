export default function AboutPage() {
    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto', minHeight: '400px' }}>
                <h1 style={{ color: 'var(--accent-color)', marginBottom: '1.5rem' }}>
                    About The Reading Engineer
                </h1>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    {/* Content will be filled by the user later */}
                    Welcome to my digital library. This section is currently under construction and will feature information about the author and the platform soon.
                </p>
            </div>
        </div>
    );
}
