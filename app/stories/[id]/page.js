import dbConnect from '@/lib/mongodb';
import Story from '@/models/Story';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SpoilerText from '@/components/SpoilerText';

export const revalidate = 60;

const LOCKED_SLUGS = ['unmasked', 'a-peculiar-date'];

export default async function StoryReader({ params }) {
    await dbConnect();
    const p = await params;

    let story;
    try {
        story = await Story.findById(p.id).lean();
    } catch {
        return notFound();
    }

    if (!story) {
        return notFound();
    }

    // Block direct URL access for locked stories
    if (LOCKED_SLUGS.includes(story.slug)) {
        return (
            <div style={{ backgroundColor: 'var(--reading-bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <div style={{ textAlign: 'center', maxWidth: '480px' }}>
                    {/* Chain top */}
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        {[...Array(7)].map((_, i) => (
                            <div key={i} style={{ width: '26px', height: '14px', border: '2px solid #6B5C36', borderRadius: '7px' }} />
                        ))}
                    </div>

                    {/* Lock icon */}
                    <div style={{ width: '72px', height: '72px', borderRadius: '50%', border: '2px solid #8B7A4A', backgroundColor: '#0F0F0F', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', boxShadow: '0 0 20px rgba(139,122,74,0.25)' }}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#A68F58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>

                    {/* Chain bottom */}
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }}>
                        {[...Array(7)].map((_, i) => (
                            <div key={i} style={{ width: '26px', height: '14px', border: '2px solid #6B5C36', borderRadius: '7px' }} />
                        ))}
                    </div>

                    <h2 style={{ color: '#A68F58', fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>{story.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                        This manuscript has been taken down at the sincere request of a real-life character within the story. Their privacy matters more than the page.
                    </p>
                    <Link href="/stories" style={{ color: 'var(--accent-color)', fontSize: '0.9rem', textDecoration: 'none' }}>
                        ← Return to all stories
                    </Link>
                </div>
            </div>
        );
    }

    // Set up Immersive Distraction Free Styling Layer
    return (
        <div style={{ backgroundColor: 'var(--reading-bg)', minHeight: '100vh', color: 'var(--reading-text)', paddingBottom: '8rem', paddingTop: '4rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link href="/" style={{ color: 'var(--text-label)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    ← Back to Hub
                </Link>

                <div className="story-hero-header" style={{ display: 'flex', flexDirection: 'row', gap: '2.5rem', alignItems: 'center', marginBottom: '3rem' }}>
                    {story.coverImage && (
                        <div className="story-hero-cover" style={{ width: '220px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <img src={story.coverImage} alt="Cover art" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <h1 style={{ fontSize: '3.5rem', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 'bold' }}>
                            {story.title}
                        </h1>

                        {story.description && story.description !== 'No description provided.' && (
                            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.5 }}>
                                {story.description}
                            </p>
                        )}
                    </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '3rem 0', opacity: 0.3 }} />

                {/* Secure Text Parsing Engine with Legacy HTML Fallback */}
                <div className="story-content" style={{ fontSize: '1.25rem', lineHeight: 1.8, fontFamily: 'var(--font-serif)', color: 'var(--text-secondary)' }}>
                    {/<\/?[a-z][\s\S]*>/i.test(story.content) ? (
                        <div dangerouslySetInnerHTML={{ __html: story.content }} />
                    ) : (
                        story.content.split('\n\n').map((paragraph, pIdx) => {
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
                        })
                    )}
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '4rem 0', opacity: 0.3 }} />

                <div style={{ textAlign: 'center', color: 'var(--text-label)' }}>
                    <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>End of manuscript.</p>
                    <Link href="/stories" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
                        Browse More Fiction
                    </Link>
                </div>
            </div>
        </div>
    );
}
