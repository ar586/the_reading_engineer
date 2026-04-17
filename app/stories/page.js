import Link from 'next/link';

export default function StoriesPage() {
    // Temporary mock data
    const stories = [
        { _id: '1', title: 'The Last Engineer', description: 'A sci-fi tale of the final server reset.', genreTags: ['Sci-Fi', 'Dystopian'] },
        { _id: '2', title: 'Echoes of Magic', description: 'Fantasy story about a hidden magical library.', genreTags: ['Fantasy'] }
    ];

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1 style={{ color: 'var(--accent-color)' }}>Stories</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Original short stories spanning multiple genres.</p>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {stories.map(story => (
                    <div key={story._id} className="card">
                        <h2>{story.title}</h2>
                        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>{story.description}</p>
                        <div style={{ marginBottom: '1rem' }}>
                            {story.genreTags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                        <Link href={`/stories/${story._id}`} className="btn-primary">
                            Read Story
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
