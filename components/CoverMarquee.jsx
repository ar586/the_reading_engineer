'use client';
import { motion } from 'framer-motion';

export default function CoverMarquee({ books }) {
    // Filter out books that don't securely have images mapped
    const coverBooks = books.filter(b => b.coverImage && b.coverImage.length > 5);
    if (coverBooks.length === 0) return null;

    // To ensure the marquee never runs out of horizontal space before resetting, we force the base array to contain minimum elements
    const minElementsNeeded = 15;
    const baseLoop = coverBooks.length >= minElementsNeeded
        ? coverBooks
        : Array(Math.ceil(minElementsNeeded / coverBooks.length)).fill(coverBooks).flat();

    // The core trick for infinite CSS/Framer scrolling: [Array A] + [Array A]
    // We animate from X: 0% to X: -50%. At exactly -50% (the end of Array A / start of Array 2), the animation instantly resets back to 0%.
    const displayBooks = [...baseLoop, ...baseLoop];

    // Compute speed organically based on item density
    const durationSpeed = displayBooks.length * 2.5;

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            padding: '2rem 0',
            marginBottom: '4rem',
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2) 50%, transparent)',
            borderTop: '1px solid rgba(255,255,255,0.02)',
            borderBottom: '1px solid rgba(255,255,255,0.02)'
        }}>
            {/* Soft gradient edges to mask absolute scrolling edges */}
            <div style={{ position: 'absolute', left: 0, top: 0, width: '120px', height: '100%', background: 'linear-gradient(to right, var(--bg-primary), transparent)', zIndex: 10, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: 0, top: 0, width: '120px', height: '100%', background: 'linear-gradient(to left, var(--bg-primary), transparent)', zIndex: 10, pointerEvents: 'none' }} />

            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: durationSpeed
                }}
                style={{
                    display: 'flex',
                    gap: '1.5rem',
                    width: 'max-content',
                    alignItems: 'center',
                    paddingLeft: '1.5rem' // Initial visual offset
                }}
            >
                {displayBooks.map((book, idx) => (
                    <motion.div
                        key={`${book._id}-${idx}`}
                        whileHover={{ scale: 1.05, y: -10, rotate: (idx % 2 === 0 ? 2 : -2) }}
                        transition={{ type: "spring", stiffness: 300 }}
                        style={{
                            width: '120px',
                            height: '185px',
                            flexShrink: 0,
                            borderRadius: 'var(--radius-sm)',
                            overflow: 'hidden',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            cursor: 'pointer',
                            position: 'relative'
                        }}
                    >
                        <img
                            src={book.coverImage}
                            alt={book.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            loading="lazy"
                        />
                        {/* Hover Tint Overlay */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 50%)', opacity: 0, transition: 'opacity 0.3s ease' }}
                            onMouseOver={e => e.currentTarget.style.opacity = 1}
                            onMouseOut={e => e.currentTarget.style.opacity = 0}
                        >
                            <p style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', fontSize: '0.7rem', color: 'var(--overlay-white)', textAlign: 'center', fontWeight: 'bold', lineHeight: 1.2 }}>
                                {book.title}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
