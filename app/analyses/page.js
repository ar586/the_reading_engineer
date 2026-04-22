import Link from 'next/link';

import dbConnect from '@/lib/mongodb';
import Analysis from '@/models/Analysis';

export const revalidate = 60;

export default async function AnalysesPage() {
    await dbConnect();
    const analyses = await Analysis.find({ isDraft: false }).sort({ createdAt: -1 }).lean();

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1 style={{ color: 'var(--accent-color)' }}>Genre & Series Breakdowns</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Deep-dive analyses into specific book series, genres, and literary mechanics.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '3rem' }}>
                {analyses.map(analysis => (
                    <div key={analysis._id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                        <div className="analysis-card-row" style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontSize: '1.6rem', marginBottom: '0.4rem', lineHeight: 1.2 }}>{analysis.title}</h2>
                                <h4 style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontWeight: 'normal', fontStyle: 'italic', marginBottom: '1rem', fontSize: '1.05rem' }}>Subject: {analysis.targetSubject}</h4>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {analysis.genreTags && analysis.genreTags.map(tag => (
                                        <span key={tag} className="tag" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                            {analysis.coverImage && (
                                <div style={{ flexShrink: 0, width: '110px', height: '160px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                                    <img src={analysis.coverImage} alt={analysis.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            )}
                        </div>

                        <Link href={`/analyses/${analysis._id}`} className="btn-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start', padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                            Read Analysis
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
