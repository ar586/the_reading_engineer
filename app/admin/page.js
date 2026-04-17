'use client';

import { useState } from 'react';

export default function AdminDashboard() {
    const [type, setType] = useState('story');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        coverImage: '',
        isDraft: false,

        // Generic tags
        genreTags: '',

        // Story specifics
        description: '',

        // Analysis specifics
        targetSubject: '',

        // Review specifics
        bookAuthor: '',
        rating: 5,
        stats: {
            plot: 5,
            writing: 5,
            recommendability: 5,
            sensitiveScale: 5
        }
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith('stats.')) {
            const statName = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                stats: { ...prev.stats, [statName]: parseInt(value) }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const finalData = { ...formData, type };

            // Format genre tags properly before persisting
            if (typeof finalData.genreTags === 'string' && finalData.genreTags.trim().length > 0) {
                finalData.genreTags = finalData.genreTags.split(',').map(tag => tag.trim());
            } else {
                finalData.genreTags = [];
            }

            const res = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData)
            });

            const data = await res.json();

            if (data.success) {
                setMessage('Content practically engineered! Saved successfully.');
                // Don't completely reset just in case they are making quick edits, but maybe reset fields.
            } else {
                setMessage('Error: ' + data.error);
            }
        } catch (err) {
            setMessage('Network error: ' + err.message);
        }
        setLoading(false);
    };

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '4rem' }}>
                <h1 style={{ marginBottom: '2rem', color: 'var(--accent-color)' }}>Author Dashboard</h1>

                {message && (
                    <div style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '4px', backgroundColor: message.includes('Error') ? '#ffebee' : '#e8f5e9', color: message.includes('Error') ? '#c62828' : '#2e7d32' }}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Content Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                            <option value="story">Short Story</option>
                            <option value="review">Book Review</option>
                            <option value="analysis">Genre/Series Analysis</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Title</label>
                        <input type="text" name="title" required value={formData.title} onChange={handleInputChange} placeholder="Engineered masterpiece title..." />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Cover Image URL (Optional)</label>
                        <input type="text" name="coverImage" value={formData.coverImage} onChange={handleInputChange} placeholder="https://example.com/cover.jpg" />
                    </div>

                    {/* Story Specific */}
                    {type === 'story' && (
                        <>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Short Description</label>
                                <textarea name="description" required rows="3" value={formData.description} onChange={handleInputChange}></textarea>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Genre Tags (Comma separated)</label>
                                <input type="text" name="genreTags" value={formData.genreTags} onChange={handleInputChange} placeholder="Sci-Fi, Dystopian, Fantasy" />
                            </div>
                        </>
                    )}

                    {/* Analysis Specific */}
                    {type === 'analysis' && (
                        <>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Target Subject (Series or Genre)</label>
                                <input type="text" name="targetSubject" required value={formData.targetSubject} onChange={handleInputChange} placeholder="e.g. The Expanse or Hard Magic Systems" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Genre Tags (Comma separated)</label>
                                <input type="text" name="genreTags" value={formData.genreTags} onChange={handleInputChange} placeholder="Tropes, Worldbuilding" />
                            </div>
                        </>
                    )}

                    {/* Review Specific */}
                    {type === 'review' && (
                        <>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Book Author</label>
                                <input type="text" name="bookAuthor" required value={formData.bookAuthor} onChange={handleInputChange} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Overall Rating (1-5)</label>
                                    <input type="number" name="rating" min="1" max="5" required value={formData.rating} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Genre Tags (Comma separated)</label>
                                    <input type="text" name="genreTags" value={formData.genreTags} onChange={handleInputChange} placeholder="Sci-Fi, Space Opera" />
                                </div>
                            </div>

                            <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                                <h4 style={{ marginBottom: '1rem' }}>Review Stats (1-10 Scale)</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Plot Progression</label>
                                        <input type="number" name="stats.plot" min="1" max="10" required value={formData.stats.plot} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Writing Quality</label>
                                        <input type="number" name="stats.writing" min="1" max="10" required value={formData.stats.writing} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Recommendability</label>
                                        <input type="number" name="stats.recommendability" min="1" max="10" required value={formData.stats.recommendability} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Sensitive Scale (Mature/Trigger Warning Level)</label>
                                        <input type="number" name="stats.sensitiveScale" min="1" max="10" required value={formData.stats.sensitiveScale} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                            Content (MDX or Plain Text)
                        </label>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            You can use HTML tags like <code>&lt;SpoilerText&gt;Spoiler is here&lt;/SpoilerText&gt;</code> to blur text!
                        </div>
                        <textarea
                            name="content"
                            required
                            rows="12"
                            value={formData.content}
                            onChange={handleInputChange}
                            style={{ fontFamily: 'var(--font-mono)' }}
                            placeholder="Write your content here..."
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="checkbox" name="isDraft" id="isDraft" checked={formData.isDraft} onChange={handleInputChange} style={{ width: 'auto' }} />
                        <label htmlFor="isDraft">Save as Draft</label>
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1rem', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Publishing...' : 'Publish Content'}
                    </button>
                </form>
            </div>
        </div>
    );
}
