'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, BookUp, Star, Calendar, Clock, Activity, Library } from 'lucide-react';
import CoverMarquee from '@/components/CoverMarquee';

export default function StatsClient({ books }) {
    // Determine available read years
    const ALL_TIME = 'All-Time';
    const readYearsParsed = new Set([ALL_TIME]);

    books.forEach(b => {
        if (b.dateRead) {
            const yr = new Date(b.dateRead).getFullYear();
            if (yr > 2000) readYearsParsed.add(String(yr));
        }
    });

    const availableYears = Array.from(readYearsParsed).sort((a, b) => b === ALL_TIME ? -1 : a === ALL_TIME ? 1 : b - a);
    const [selectedYear, setSelectedYear] = useState(ALL_TIME);

    const filteredBooks = useMemo(() => {
        if (selectedYear === ALL_TIME) {
            return [...books].sort((a, b) => new Date(b.dateRead || 0) < new Date(a.dateRead || 0) ? 1 : -1);
        }
        return books.filter(b => {
            if (!b.dateRead) return false;
            return new Date(b.dateRead).getFullYear() === parseInt(selectedYear);
        }).sort((a, b) => new Date(b.dateRead) < new Date(a.dateRead) ? 1 : -1);
    }, [selectedYear, books]);

    const totalBooks = filteredBooks.length;
    let totalPages = 0;
    let totalRating = 0;
    let ratedBooks = 0;
    let oldestBook = { yearPublished: 9999, originalPublicationYear: 9999 };

    const decades = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = new Array(12).fill(0);

    filteredBooks.forEach(b => {
        if (b.numberOfPages) totalPages += b.numberOfPages;
        if (b.myRating > 0) {
            totalRating += b.myRating;
            ratedBooks++;
        }

        if (b.dateRead) {
            const m = new Date(b.dateRead).getMonth();
            if (!isNaN(m)) monthlyData[m]++;
        }

        const yr = b.originalPublicationYear || b.yearPublished;
        if (yr && yr > 1000 && yr <= new Date().getFullYear()) {
            if (yr < (oldestBook.originalPublicationYear || oldestBook.yearPublished)) {
                oldestBook = b;
            }
            const dec = Math.floor(yr / 10) * 10;
            decades[`${dec}s`] = (decades[`${dec}s`] || 0) + 1;
        }
    });

    const avgRating = ratedBooks > 0 ? (totalRating / ratedBooks).toFixed(2) : 0;
    const monthlyChartData = months.map((m, i) => ({ name: m, count: monthlyData[i] }));

    return (
        <section className="container" style={{ padding: '2rem 1rem', flex: 1, paddingBottom: '6rem' }}>

            {/* Elegant Year Selector */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '4rem' }}
            >
                {availableYears.map(year => {
                    const isActive = selectedYear === year;
                    return (
                        <motion.button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                position: 'relative',
                                padding: '0.6rem 1.5rem',
                                borderRadius: 'var(--radius-full)',
                                border: 'none',
                                backgroundColor: isActive ? 'var(--accent-color)' : 'var(--bg-tertiary)',
                                color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                                fontWeight: isActive ? 'bold' : 'normal',
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                                overflow: 'hidden',
                                boxShadow: isActive ? '0 4px 15px rgba(199, 163, 74, 0.4)' : 'none',
                                transition: 'background-color 0.3s, color 0.3s'
                            }}
                        >
                            {year}
                        </motion.button>
                    )
                })}
            </motion.div>

            {/* Seamless Infinite Loop Book Slideshow */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <CoverMarquee books={filteredBooks} />
            </motion.div>

            {/* Glassmorphic Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
                {[
                    { label: 'Books Finished', value: totalBooks, icon: BookOpen, color: 'var(--accent-color)' },
                    { label: 'Pages Absorbed', value: totalPages.toLocaleString(), icon: Library, color: 'var(--overlay-white)' },
                    { label: 'Average Rating', value: `${avgRating}/5`, icon: Star, color: 'var(--accent-hover)' }
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.15 }}
                        style={{
                            padding: '2.5rem 2rem',
                            borderRadius: 'var(--radius-lg)',
                            background: 'linear-gradient(145deg, var(--bg-tertiary) 0%, rgba(30, 52, 66, 0.4) 100%)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ padding: '1.25rem', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <stat.icon size={32} color={stat.color} />
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.35rem' }}>{stat.label}</h3>
                            <p style={{ fontSize: '2.5rem', fontWeight: '900', color: stat.color, lineHeight: 1 }}>{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Beautiful Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '4rem' }}>

                {/* Monthly Area Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <Activity size={24} color="var(--accent-hover)" />
                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', margin: 0, fontWeight: 300 }}>Reading Velocity Tracking</h2>
                    </div>

                    <div style={{ width: '100%', height: 320 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--accent-hover)" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="var(--accent-hover)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis stroke="var(--text-secondary)" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(24, 44, 56, 0.9)', border: '1px solid var(--accent-color)', borderRadius: '8px', color: 'var(--overlay-white)', backdropFilter: 'blur(10px)' }}
                                    itemStyle={{ color: 'var(--accent-color)', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="count" stroke="var(--accent-color)" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

            </div>

            {/* Premium Book Roster Grid */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
                    <BookUp size={28} color="var(--accent-color)" />
                    <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', margin: 0, letterSpacing: '-1px' }}>Roster ({selectedYear})</h2>
                </div>

                {filteredBooks.length > 0 ? (
                    <motion.div
                        layout
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '1.5rem' }}
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredBooks.map((book, i) => (
                                <motion.div
                                    key={book._id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.5) }}
                                    whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.3)', borderColor: 'var(--accent-hover)' }}
                                    style={{
                                        padding: '1.5rem',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'linear-gradient(180deg, var(--bg-tertiary) 0%, rgba(20,20,20,0.2) 100%)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: book.myRating >= 4 ? 'var(--accent-color)' : book.myRating > 0 ? 'var(--accent-hover)' : 'var(--text-secondary)', opacity: 0.8 }} />

                                    <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem', flex: 1 }}>
                                        {book.coverImage ? (
                                            <div style={{ flexShrink: 0, width: '70px', height: '105px', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                <img src={book.coverImage} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        ) : (
                                            <div style={{ flexShrink: 0, width: '70px', height: '105px', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <BookUp size={24} color="var(--text-label)" opacity={0.5} />
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <h4 style={{ color: 'var(--overlay-white)', fontSize: '1.1rem', marginBottom: '0.35rem', lineHeight: 1.3, fontWeight: 'bold' }}>{book.title}</h4>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic' }}>By {book.author}</p>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-label)', fontSize: '0.8rem', padding: '4px 10px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-full)' }}>
                                            <Calendar size={12} />
                                            <span>
                                                {book.dateRead ? new Date(book.dateRead).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Completed'}
                                            </span>
                                        </div>

                                        {book.myRating > 0 && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#E1C699', fontWeight: 'bold', fontSize: '0.95rem' }}>
                                                <Star size={14} fill="#E1C699" />
                                                <span>{book.myRating}/5</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-color)' }}>
                        <Clock size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>No titles securely mapped for this temporal segment.</p>
                    </div>
                )}
            </motion.div>

        </section>
    );
}
