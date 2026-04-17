'use client';

import React, { useState } from 'react';
import './SpoilerText.css';

export default function SpoilerText({ children }) {
    const [isRevealed, setIsRevealed] = useState(false);

    const handleClick = () => {
        setIsRevealed(true);
    };

    return (
        <span
            className={`spoiler-container ${isRevealed ? 'revealed' : 'blurred'}`}
            onClick={handleClick}
            title={isRevealed ? '' : 'Click to reveal spoiler'}
        >
            <span className="spoiler-content">
                {children}
            </span>
            {!isRevealed && (
                <span className="spoiler-overlay">
                    <span className="spoiler-icon">⚠️ Spoiler</span>
                </span>
            )}
        </span>
    );
}
