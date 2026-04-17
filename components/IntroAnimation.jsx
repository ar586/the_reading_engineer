'use client';

import { useState, useEffect } from 'react';
import './IntroAnimation.css';

export default function IntroAnimation() {
    const [stage, setStage] = useState('closed'); // closed, opening, spitting

    useEffect(() => {
        // 1. Book opens quickly after load
        const openTimer = setTimeout(() => {
            setStage('opening');
        }, 500);

        // 2. Book spits out the text
        const spitTimer = setTimeout(() => {
            setStage('spitting');
        }, 1500);

        return () => {
            clearTimeout(openTimer);
            clearTimeout(spitTimer);
        };
    }, []);

    return (
        <div className="hero-animation-container">
            <div className={`tiny-book-container stage-${stage}`}>
                <div className="book">
                    {/* Back cover */}
                    <div className="book-back"></div>

                    {/* Right Page */}
                    <div className="book-page page-right">
                        <div className="mock-text"></div>
                    </div>

                    {/* Left Page (Front Cover rotates open) */}
                    <div className="book-page page-left">
                        <div className="book-cover-front"></div>
                        <div className="book-cover-inside">
                            <div className="mock-text"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Text that gets spit out */}
            <div className={`hero-text-container stage-${stage}`}>
                <h1 className="hero-title">
                    Welcome to The Reading Engineer
                </h1>
                <p className="hero-subtitle">
                    Original fiction stories, honest book reviews, and deep genre breakdowns.
                </p>
            </div>
        </div>
    );
}
