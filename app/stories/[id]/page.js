import dbConnect from '@/lib/mongodb';
import Story from '@/models/Story';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

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

    // Set up Immersive Distraction Free Styling Layer
    return (
        <div style={{ backgroundColor: 'var(--reading-bg)', minHeight: '100vh', color: 'var(--reading-text)', paddingBottom: '8rem', paddingTop: '4rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link href="/" style={{ color: 'var(--text-label)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    ← Back to Hub
                </Link>

                <div style={{ display: 'flex', flexDirection: 'row', gap: '2.5rem', alignItems: 'center', marginBottom: '3rem' }}>
                    {story.coverImage && (
                        <div style={{ width: '220px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
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

                {/* Secure HTML Injection since payload implies HTML tags structurally mapped in DB */}
                <div
                    className="story-content"
                    style={{ fontSize: '1.25rem', lineHeight: 1.8, fontFamily: 'var(--font-serif)' }}
                    dangerouslySetInnerHTML={{ __html: story.content }}
                />

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
