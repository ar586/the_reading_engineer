import Link from 'next/link';
import SpoilerText from '@/components/SpoilerText';

export default function ReviewsPage() {
    // Temporary mock data
    const reviews = [
        { _id: '1', title: 'A Masterpiece of Space Opera', bookAuthor: 'Frank Herbert', rating: 5, tags: ['Sci-Fi', 'Classic'] },
        { _id: '2', title: 'Interesting but flawed', bookAuthor: 'Unknown', rating: 3, tags: ['Mystery'] }
    ];

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <h1 style={{ color: 'var(--accent-color)' }}>Book Reviews</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Critical reviews of fiction books. <SpoilerText>Spoiler: this is an example spoiler tag.</SpoilerText>
            </p>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {reviews.map(review => (
                    <div key={review._id} className="card">
                        <h2>{review.title}</h2>
                        <h4 style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>By: {review.bookAuthor}</h4>
                        <div style={{ margin: '1rem 0' }}>
                            <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>Rating: {review.rating}/5 Stars</span>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            {review.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                        <Link href={`/reviews/${review._id}`} className="btn-primary">
                            Read Review
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
