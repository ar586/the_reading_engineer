import Link from 'next/link';

export default function AnalysisDetailsPage({ params }) {
    // Temporary mock data
    const analysis = {
        title: 'The Evolution of Hard Magic Systems',
        targetSubject: 'Fantasy Genre',
        content: 'Hard magic systems are defined by their strict rules and limitations. In modern fantasy, this trend has grown exponentially...',
        tags: ['Magic Systems', 'Fantasy']
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link href="/analyses" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                &larr; Back to Analyses
            </Link>

            <div className="card" style={{ padding: '3rem' }}>
                <h1 style={{ marginBottom: '0.5rem' }}>{analysis.title}</h1>
                <h3 style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: 'normal' }}>
                    Target: {analysis.targetSubject}
                </h3>

                <div style={{ marginBottom: '2rem' }}>
                    {analysis.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>

                <div style={{ fontSize: '1.2rem', lineHeight: '1.8', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-serif)' }}>
                    {analysis.content}
                </div>
            </div>
        </div>
    );
}
