'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Only show on content-reading pages
const CONTENT_PATTERN = /^\/(stories|reviews|analyses)\/[^/]+/;

export default function ReadingProgressBar() {
    const pathname = usePathname();
    const [progress, setProgress] = useState(0);
    const isContentPage = CONTENT_PATTERN.test(pathname);

    useEffect(() => {
        if (!isContentPage) return;

        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(Math.min(pct, 100));
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
        return () => window.removeEventListener('scroll', updateProgress);
    }, [pathname, isContentPage]);

    if (!isContentPage) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                zIndex: 99999,
                backgroundColor: 'rgba(255,255,255,0.08)',
                pointerEvents: 'none',
            }}
        >
            <div
                style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, var(--accent-color), var(--accent-hover))',
                    transition: 'width 0.08s linear',
                    boxShadow: '0 0 10px var(--accent-color)',
                }}
            />
        </div>
    );
}
