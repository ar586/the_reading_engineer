'use client';

import Link from 'next/link';
import SpoilerText from '@/components/SpoilerText';

export default function ReviewDetailsPage({ params }) {
    // Temporary mock data
    const review = {
        title: 'A Masterpiece of Space Opera',
        bookAuthor: 'Frank Herbert',
        rating: 5,
        content: "Dune is incredible. The world building is second to none. However, <SpoilerText>Paul Atreides essentially becomes a reluctant god</SpoilerText> which takes the story in a wild direction in later books. Highly recommended.",
        tags: ['Sci-Fi', 'Classic']
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link href="/reviews" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                &larr; Back to Reviews
            </Link>

            <div className="card" style={{ padding: '3rem' }}>
                <h1 style={{ marginBottom: '0.5rem' }}>{review.title}</h1>
                <h3 style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', fontWeight: 'normal' }}>
                    Book by: {review.bookAuthor}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '1.25rem', color: 'var(--accent-color)', fontWeight: 'bold' }}>
                        Rating: {review.rating} / 5
                    </div>
                    <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-color)' }}></div>
                    <div>
                        {review.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                </div>

                <div style={{ fontSize: '1.2rem', lineHeight: '1.8', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-serif)' }}>
                    {/* Mock formatting. In reality, we could use a markdown parser to output jsx or raw HTML containing React components */}
                    {review.content.split('<SpoilerText>').map((part, index) => {
                        if (index === 0) return <span key={index}>{part}</span>;
                        const [spoiler, rest] = part.split('</SpoilerText>');
                        return (
                            <span key={index}>
                                <SpoilerText>{spoiler}</SpoilerText>
                                {rest}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
