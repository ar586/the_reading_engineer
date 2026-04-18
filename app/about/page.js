'use client';

export default function AboutPage() {
    return (
        <div className="container" style={{ padding: '4rem 1rem 6rem 1rem' }}>
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ color: 'var(--accent-color)', marginBottom: '1.5rem', fontSize: '2.5rem', letterSpacing: '-0.5px' }}>
                    Hey, I’m <em>The Reading Engineer</em>.
                </h1>

                <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '3rem' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Calling myself a software engineer might be a bit ambitious, aspiring fits better, but stories? Those have always been my real constant.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Ever since I was a kid, I’ve spent hours lost in pages, starting with <em>Magic Pot</em> and <em>Champak</em>, moving on to short stories, and eventually diving into novels. The content evolved, but the love for fiction never did.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        Now, whatever little time I get, on the metro, in class (no guilt, most lectures aren’t worth it anyway), or before bed, I’m usually reading.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        This site is a small reflection of my thoughts, ideas, and everything I discover through books. More than anything, I hope it helps me connect with people who feel the same way about stories.
                    </p>
                    <p style={{ fontStyle: 'italic', color: 'var(--overlay-white)' }}>
                        I’m always open to ideas, suggestions, and feedback, so feel free to reach out.
                    </p>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                {/* FAQ Section */}
                <h2 style={{ color: 'var(--overlay-white)', marginBottom: '2rem', fontSize: '1.8rem' }}>
                    Questions you might have
                </h2>

                <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
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
                        <p style={{ color: 'var(--text-secondary)' }}>Honestly, writing isn’t a huge space in India, so it’ll probably remain a hobby. But I do have one dream—to get a novel published before I disappear from this planet.</p>
                    </div>
                    <div>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '1.1rem' }}>6. How many books do I own?</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Definitely over 150. I stopped counting after a point because it started making me feel guilty… lol.</p>
                    </div>
                </div>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '3rem 0' }} />

                {/* Social Connects */}
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontStyle: 'italic', textAlign: 'center' }}>
                    If you still wanna talk more, here are my socials:
                </p>

                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                    <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', width: '120px' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-color)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-primary)'}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Instagram</span>
                    </a>

                    <a href="#" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', width: '120px' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-color)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-primary)'}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>LinkedIn</span>
                    </a>
                </div>

            </div>
        </div>
    );
}
