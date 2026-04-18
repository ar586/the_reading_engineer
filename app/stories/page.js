import dbConnect from '@/lib/mongodb';
import Story from '@/models/Story';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

// Stories locked at the request of real-life characters
const LOCKED_SLUGS = ['unmasked', 'a-peculiar-date'];

function LockedCard({ story }) {
    return (
        <div className="card" style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            cursor: 'not-allowed',
            userSelect: 'none'
        }}>
            {/* Blurred content underneath */}
            <div style={{ filter: 'blur(3px)', opacity: 0.35, pointerEvents: 'none' }}>
                {story.coverImage && (
                    <div style={{ width: '100%', height: '200px', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                        <img src={story.coverImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                )}
                <h2 style={{ color: 'var(--overlay-white)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>{story.title}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{story.description}</p>
            </div>

            {/* Chain / Lock Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                background: 'linear-gradient(135deg, rgba(10,10,10,0.6) 0%, rgba(22,22,22,0.7) 100%)',
                backdropFilter: 'blur(1px)',
                padding: '1.5rem'
            }}>
                {/* Chain decorative lines */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '0.5rem' }}>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} style={{
                            width: '22px', height: '12px',
                            border: '2px solid #8B7A4A',
                            borderRadius: '6px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
                            backgroundColor: 'transparent'
                        }} />
                    ))}
                </div>

                {/* Lock Icon */}
                <div style={{
                    width: '52px', height: '52px',
                    borderRadius: '50%',
                    border: '2px solid #8B7A4A',
                    backgroundColor: 'rgba(15,15,15,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 12px rgba(139,122,74,0.3)'
                }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A68F58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>

                {/* Chain decorative lines (bottom) */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '0.5rem' }}>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} style={{
                            width: '22px', height: '12px',
                            border: '2px solid #8B7A4A',
                            borderRadius: '6px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.5)',
                            backgroundColor: 'transparent'
                        }} />
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                    <p style={{ color: '#A68F58', fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '0.35rem', fontFamily: 'var(--font-serif)' }}>
                        {story.title}
                    </p>
                    <p style={{ color: 'var(--text-label)', fontSize: '0.8rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                        Taken down at the request<br />of a real-life character.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default async function StoriesIndex() {
    await dbConnect();
    const stories = await Story.find({ isDraft: false }).sort({ createdAt: -1 }).lean();

    return (
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3.5rem', color: 'var(--overlay-white)', letterSpacing: '-1px' }}>All Stories</h1>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '1.2rem' }}>A collection of original fiction manuscripts.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                {stories.map(story => {
                    const isLocked = LOCKED_SLUGS.includes(story.slug);

                    if (isLocked) {
                        return <LockedCard key={story._id.toString()} story={story} />;
                    }

                    return (
                        <Link href={`/stories/${story._id.toString()}`} key={story._id.toString()} className="card" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                            {story.coverImage && (
                                <div style={{ width: '100%', height: '200px', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                                    <img src={story.coverImage} alt={story.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            )}
                            <h2 style={{ color: 'var(--overlay-white)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>{story.title}</h2>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                {story.genreTags && story.genreTags.map((tag, i) => (
                                    <span key={i} className="tag">{tag}</span>
                                ))}
                            </div>

                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, flex: 1 }}>{story.description}</p>

                            <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-label)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span>{new Date(story.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                <span style={{ color: 'var(--accent-color)' }}>Read manuscript →</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
