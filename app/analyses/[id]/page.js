import dbConnect from '@/lib/mongodb';
import Analysis from '@/models/Analysis';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SpoilerText from '@/components/SpoilerText';

export const dynamic = 'force-dynamic';

export default async function AnalysisDetailsPage({ params }) {
    await dbConnect();
    const p = await params;

    let analysis;
    try {
        analysis = await Analysis.findById(p.id).lean();
    } catch {
        return notFound();
    }

    if (!analysis || analysis.isDraft) {
        return notFound();
    }

    return (
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem', maxWidth: '900px' }}>
            <Link href="/analyses" style={{ color: 'var(--text-label)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem', fontSize: '0.9rem' }}>
                ← Back to Analysis
            </Link>

            <div className="card" style={{ padding: '3rem' }}>
                <div className="analysis-detail-header" style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', alignItems: 'flex-start' }}>
                    {analysis.coverImage && (
                        <div style={{ flexShrink: 0, width: '220px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}>
                            <img src={analysis.coverImage} alt={analysis.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                    )}
                    <div>
                        <h1 style={{ fontSize: '3rem', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '0.5rem', fontFamily: 'var(--font-serif)', color: 'var(--overlay-white)' }}>
                            {analysis.title}
                        </h1>

                        <h3 style={{ color: 'var(--accent-color)', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: 'normal', fontSize: '1.25rem' }}>
                            Target: {analysis.targetSubject}
                        </h3>

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {analysis.genreTags && analysis.genreTags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '2rem 0', opacity: 0.3 }} />

                <div className="story-content" style={{ fontSize: '1.15rem', lineHeight: 1.8, fontFamily: 'var(--font-serif)', color: 'var(--text-secondary)' }}>
                    {analysis.content.split('\n\n').map((paragraph, pIdx) => {
                        if (!paragraph.trim()) return null;
                        const parts = paragraph.split('<SpoilerText>');
                        return (
                            <p key={pIdx} style={{ marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>
                                {parts.map((part, index) => {
                                    if (index === 0) return <span key={index}>{part}</span>;
                                    const [spoiler, rest] = part.split('</SpoilerText>');
                                    return (
                                        <span key={index}>
                                            <SpoilerText>{spoiler}</SpoilerText>
                                            {rest}
                                        </span>
                                    );
                                })}
                            </p>
                        );
                    })}
                </div>

                <div style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--text-label)', fontSize: '0.85rem' }}>
                    <p style={{ fontStyle: 'italic' }}>
                        Published on {new Date(analysis.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>
        </div>
    );
}
