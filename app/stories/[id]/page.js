'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StoryReadPage({ params }) {
    // Temporary mock data
    const story = {
        title: 'The Last Engineer',
        content: 'It was the year 3045. The servers finally ran out of coffee... \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed arcu et arcu egestas tempor vitae sit amet nulla. Praesent auctor tortor ut dui malesuada, in hendrerit ipsum lobortis.\n\nVivamus eu fermentum lectus. Donec in justo id nisl cursus viverra aliquet vitae arcu. Proin vitae mauris lacus. In ut risus eget justo egestas commodo. Cras semper risus quis magna convallis ullamcorper.',
        genreTags: ['Sci-Fi', 'Dystopian']
    };

    const [isReadingMode, setIsReadingMode] = useState(false);
    const [fontSize, setFontSize] = useState(18);

    return (
        <div className={`story-wrapper ${isReadingMode ? 'reading-mode' : ''}`} style={{ transition: 'all 0.3s ease' }}>

            {/* Dynamic inline styles for reading mode overriding global CSS */}
            <style jsx>{`
        .reading-mode {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: var(--reading-bg);
          color: var(--reading-text);
          z-index: 1000;
          overflow-y: auto;
          padding: 2rem 1rem;
        }
        .story-content {
          font-size: ${fontSize}px;
          line-height: 1.8;
          max-width: 800px;
          margin: 0 auto;
          white-space: pre-wrap;
          font-family: var(--font-serif);
        }
        .reading-toolbar {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          padding: 1rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          display: flex;
          gap: 1rem;
          align-items: center;
          z-index: 1010;
        }
      `}</style>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {!isReadingMode && (
                    <Link href="/stories" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                        &larr; Back to Stories
                    </Link>
                )}

                <h1 style={{ fontSize: isReadingMode ? '3rem' : '2.5rem', marginBottom: '1rem' }}>{story.title}</h1>

                {!isReadingMode && (
                    <div style={{ marginBottom: '2rem' }}>
                        {story.genreTags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                )}

                <div className="story-content">
                    {story.content}
                </div>
            </div>

            {/* Toolbar */}
            <div className="reading-toolbar">
                <button
                    onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                    style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                    A-
                </button>
                <span style={{ fontSize: '0.9rem' }}>{fontSize}px</span>
                <button
                    onClick={() => setFontSize(prev => Math.min(32, prev + 2))}
                    style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                    A+
                </button>
                <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)', margin: '0 0.5rem' }}></div>
                <button
                    className="btn-primary"
                    onClick={() => setIsReadingMode(!isReadingMode)}>
                    {isReadingMode ? 'Exit Reading Mode' : 'Reading Mode'}
                </button>
            </div>

        </div>
    );
}
