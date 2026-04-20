import Link from 'next/link';
import SpoilerText from '@/components/SpoilerText';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';
import { Star } from 'lucide-react';

export default async function ReviewsPage() {
    await dbConnect();
    const reviews = await Review.find({ isDraft: false }).sort({ createdAt: -1 }).lean();

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1 style={{ color: 'var(--accent-color)' }}>Book Reviews</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Critical reviews of fiction books. <SpoilerText>this is an example spoiler tag, remove only if you are okay knowing spoiler.</SpoilerText>
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '2.5rem' }}>
                {reviews.map(review => (
                    <Link key={review._id} href={`/reviews/${review._id}`} style={{ textDecoration: 'none' }}>
                        <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'row', minHeight: '250px', overflow: 'hidden' }}>

                            {/* LHS: Edge-to-edge book cover */}
                            {review.coverImage ? (
                                <div style={{ width: '150px', height: '100%', flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                                    <img src={review.coverImage} alt={review.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ) : (
                                <div style={{ width: '150px', height: '100%', flexShrink: 0, backgroundColor: 'rgba(0,0,0,0.4)', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ color: 'var(--text-label)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>No Cover</span>
                                </div>
                            )}

                            {/* RHS: Card Information */}
                            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', backgroundColor: 'rgba(10, 15, 20, 0.4)' }}>
                                <div>
                                    <h2 style={{ fontSize: '1.4rem', marginBottom: '0.4rem', lineHeight: 1.2, color: 'var(--overlay-white)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {review.title}
                                    </h2>
                                    <h4 style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontWeight: 'normal', fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                                        By {review.bookAuthor}
                                    </h4>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={18} fill={i < review.rating ? "#E1C699" : "transparent"} stroke={i < review.rating ? "#E1C699" : "var(--border-color)"} />
                                        ))}
                                    </div>

                                    {review.stats && (
                                        <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '0.5rem' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontSize: '0.7rem', color: 'var(--text-label)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Plot</span>
                                                <span style={{ fontSize: '0.9rem', color: 'var(--accent-color)', fontWeight: 'bold' }}>{review.stats.plot}/10</span>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontSize: '0.7rem', color: 'var(--text-label)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Writing</span>
                                                <span style={{ fontSize: '0.9rem', color: 'var(--accent-color)', fontWeight: 'bold' }}>{review.stats.writing}/10</span>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontSize: '0.7rem', color: 'var(--text-label)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Rec'd</span>
                                                <span style={{ fontSize: '0.9rem', color: 'var(--accent-color)', fontWeight: 'bold' }}>{review.stats.recommendability}/10</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginTop: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', overflow: 'hidden', height: '24px' }}>
                                        {review.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="tag" style={{ padding: '0.15rem 0.6rem', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'transparent' }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                                        Read Review
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
