'use client';
import { useState } from 'react';

export default function AboutPage() {
    const [shelfOpen, setShelfOpen] = useState(false);

    return (
        <div className="container" style={{ padding: '4rem 1rem 6rem 1rem' }}>
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ color: 'var(--accent-color)', marginBottom: '1.5rem', fontSize: '2.5rem', letterSpacing: '-0.5px' }}>
                    Hey, I'm <em>The Reading Engineer</em>.
                </h1>

                <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '3rem' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Calling myself a software engineer might be a bit ambitious, aspiring fits better, but stories? Those have always been my real constant.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Ever since I was a kid, I've spent hours lost in pages, starting with <em>Magic Pot</em> and <em>Champak</em>, moving on to short stories, and eventually diving into novels. The content evolved, but the love for fiction never did.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Now, whatever little time I get, on the metro, in class (no guilt, most lectures aren't worth it anyway), or before bed, I'm usually reading.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        This site is a small reflection of my thoughts, ideas, and everything I discover through books. More than anything, I hope it helps me connect with people who feel the same way about stories.
                    </p>
                    <p style={{ fontStyle: 'italic', color: 'var(--overlay-white)' }}>
                        I'm always open to ideas, suggestions, and feedback, so feel free to reach out.
                    </p>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                <h2 style={{ color: 'var(--overlay-white)', fontSize: '1.8rem', marginBottom: '2rem' }}>
                    Questions you might have
                </h2>

                {/* FAQ + Image side-by-side */}
                <div className="faq-row" style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', marginBottom: '3rem' }}>

                    {/* Left: FAQ list */}
                    <div style={{ display: 'grid', gap: '1.5rem', flex: 1 }}>
                        <div>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>1. Favorite authors?</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Khaled Hosseini and Stephen King.</p>
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>2. Favorite genres?</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Horror and dystopian.</p>
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>3. Preferred medium of reading?</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>I used to hate the idea, but now my life practically depends on my Kindle.</p>
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>4. How many books have I read?</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Definitely over 100.</p>
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>5. What do I see for the future in this field?</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Honestly, writing isn't a huge space in India, so it'll probably remain a hobby. But I do have one dream—to get a novel published before I disappear from this planet.</p>
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>6. How many books do I own?</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Definitely over 150. I stopped counting after a point because it started making me feel guilty… lol.</p>
                        </div>
                    </div>

                    {/* Right: Circular shelf image that opens fullscreen on click */}
                    <div className="faq-avatar" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', paddingTop: '0.25rem' }}>
                        <div
                            onClick={() => setShelfOpen(true)}
                            title="Click to see my shelf"
                            style={{
                                width: '140px',
                                height: '140px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '3px solid var(--accent-color)',
                                cursor: 'pointer',
                                boxShadow: '0 0 0 6px rgba(166,143,88,0.15)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 0 8px rgba(166,143,88,0.3)'; }}
                            onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 0 6px rgba(166,143,88,0.15)'; }}
                        >
                            <img src="/hobby-reading.jpg" alt="My shelf" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-label)', textAlign: 'center', fontStyle: 'italic' }}>in case you want to see </span>
                    </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontStyle: 'italic', textAlign: 'center' }}>
                    If you wanna know more about me, here are my socials:
                </p>

                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                    <a href="https://www.instagram.com/aryansingh4600?igsh=MTIxanE0YmF2bXNzMg==" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', width: '120px' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-color)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-primary)'}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Instagram</span>
                    </a>

                    <a href="https://www.linkedin.com/in/aryan-anand-4aba06309/" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', width: '120px' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-color)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-primary)'}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>LinkedIn</span>
                    </a>
                </div>
            </div>

            {/* Fullscreen Lightbox Overlay */}
            {shelfOpen && (
                <div
                    onClick={() => setShelfOpen(false)}
                    style={{
                        position: 'fixed', inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.88)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        cursor: 'zoom-out',
                    }}
                >
                    <div style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }}>
                        <img
                            src="/hobby-reading.jpg"
                            alt="My Book Shelf"
                            style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '8px', boxShadow: '0 25px 60px rgba(0,0,0,0.8)', display: 'block' }}
                        />
                        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '1rem', fontStyle: 'italic' }}>
                            Yes, that's the actual shelf. It's a mess. I love it. (click anywhere to close)
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
