import dbConnect from '@/lib/mongodb';
import GoodreadsBook from '@/models/GoodreadsBook';
import TornEdge from '@/components/TornEdge';
import StatsClient from './StatsClient';

export const dynamic = 'force-dynamic';

export default async function StatsPage() {
    await dbConnect();

    // Extracted exactly to capture the user's 80+ finished books bypassing structural anomalies 
    const rawBooks = await GoodreadsBook.find({
        $or: [
            { bookshelves: { $regex: /read/i, $not: /currently-reading/i } },
            { exclusiveShelf: { $regex: /read/i, $not: /currently-reading/i } },
            { dateRead: { $ne: null } }
        ]
    }).lean();

    // Data must be structurally native to pass over network layer
    const books = rawBooks.map(b => ({
        ...b,
        _id: b._id.toString(),
        dateRead: b.dateRead ? b.dateRead.toISOString() : null,
        dateAdded: b.dateAdded ? b.dateAdded.toISOString() : null
    }));

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>

            {/* Header Banner */}
            <section style={{ backgroundColor: 'var(--overlay-white)', paddingTop: '4rem', paddingBottom: '3rem', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', color: 'var(--bg-secondary)', marginBottom: '1rem', textShadow: 'none' }}>
                        Library Analytics
                    </h1>
                    <p style={{ color: 'var(--bg-primary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', fontStyle: 'italic' }}>
                        A structural deep-dive into lifetime reading habits, extracted securely from Goodreads data telemetry.
                    </p>
                </div>
            </section>

            <TornEdge fill="var(--overlay-white)" />

            {/* Modular Client Filter Grid */}
            <StatsClient books={books} />

        </div>
    );
}
