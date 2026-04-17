import Link from 'next/link';

export default function AnalysesPage() {
    // Temporary mock data
    const analyses = [
        { _id: '1', title: 'The Evolution of Hard Magic Systems', targetSubject: 'Fantasy Genre', tags: ['Magic Systems', 'Fantasy'] },
        { _id: '2', title: 'Why The Expanse works so well', targetSubject: 'The Expanse Series', tags: ['Sci-Fi', 'Worldbuilding'] }
    ];

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1 style={{ color: 'var(--accent-color)' }}>Genre & Series Breakdowns</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Deep-dive analyses into specific book series, genres, and literary mechanics.</p>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {analyses.map(analysis => (
                    <div key={analysis._id} className="card">
                        <h2>{analysis.title}</h2>
                        <h4 style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>Subject: {analysis.targetSubject}</h4>
                        <div style={{ margin: '1rem 0' }}>
                            {analysis.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                        <Link href={`/analyses/${analysis._id}`} className="btn-primary">
                            Read Analysis
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
