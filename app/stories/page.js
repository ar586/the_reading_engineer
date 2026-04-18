import dbConnect from '@/lib/mongodb';
import Story from '@/models/Story';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

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
                {stories.map(story => (
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
                ))}
            </div>
        </div>
    );
}
