import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star } from 'lucide-react';
import SpoilerText from '@/components/SpoilerText';

export const dynamic = 'force-dynamic';

export default async function ReviewDetailsPage({ params }) {
    await dbConnect();
    const p = await params;

    let review;
    try {
        review = await Review.findById(p.id).lean();
    } catch {
        return notFound();
    }

    if (!review || review.isDraft) {
        return notFound();
    }

    return (
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem', maxWidth: '900px' }}>
            <Link href="/reviews" style={{ color: 'var(--text-label)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem', fontSize: '0.9rem' }}>
                ← Back to Reviews
            </Link>

            <div className="card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Header Section */}
                <div style={{ paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '2rem', flexDirection: 'column' }}>

                    <div style={{ display: 'flex', gap: '2rem', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        {review.coverImage && (
                            <div style={{ flexShrink: 0, width: '120px', height: '180px', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <img src={review.coverImage} alt={review.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        )}

                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontSize: '3rem', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '0.5rem', fontFamily: 'var(--font-serif)', color: 'var(--overlay-white)' }}>
                                {review.title}
                            </h1>
                            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '1.5rem', fontWeight: 'normal' }}>
                                Book by: {review.bookAuthor}
                            </h2>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#E1C699', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={20} fill={i < review.rating ? "#E1C699" : "transparent"} stroke={i < review.rating ? "#E1C699" : "var(--border-color)"} />
                                    ))}
                                    <span style={{ marginLeft: '0.5rem', color: 'var(--overlay-white)' }}>{review.rating}/5</span>
                                </div>
                                <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-color)' }}></div>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {review.genreTags && review.genreTags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Score Breakdown */}
                {review.stats && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', padding: '1.5rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-label)', textTransform: 'uppercase', letterSpacing: '1px' }}>Plot</span>
                            <span style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '1.1rem' }}>{review.stats.plot}/10</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-label)', textTransform: 'uppercase', letterSpacing: '1px' }}>Writing</span>
                            <span style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '1.1rem' }}>{review.stats.writing}/10</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-label)', textTransform: 'uppercase', letterSpacing: '1px' }}>Recommendability</span>
                            <span style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '1.1rem' }}>{review.stats.recommendability}/10</span>
                        </div>
                    </div>
                )}

                {/* Content Injection */}
                <div className="story-content" style={{ fontSize: '1.15rem', lineHeight: 1.8, fontFamily: 'var(--font-serif)', color: 'var(--text-secondary)' }}>
                    {review.content.split('\n\n').map((paragraph, pIdx) => {
                        if (!paragraph.trim()) return null;

                        // Parse for SpoilerText within the paragraph
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

                <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-label)', fontSize: '0.85rem' }}>
                    <p style={{ fontStyle: 'italic' }}>
                        Published on {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>
        </div>
    );
}
