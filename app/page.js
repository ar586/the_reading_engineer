import Link from 'next/link';
import IntroAnimation from '@/components/IntroAnimation';
import TornEdge from '@/components/TornEdge';
import dbConnect from '@/lib/mongodb';
import Story from '@/models/Story';
import Review from '@/models/Review';
import Analysis from '@/models/Analysis';
import GoodreadsBook from '@/models/GoodreadsBook';

// Tells Next.js not to statically cache this page so new database additions show immediately
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Connect to cluster
  await dbConnect();

  // Fetch the 3 most recent entries for each category
  const stories = await Story.find({ isDraft: false }).sort({ createdAt: -1 }).limit(3).lean();
  const reviews = await Review.find({ isDraft: false }).sort({ createdAt: -1 }).limit(3).lean();
  const analyses = await Analysis.find({ isDraft: false }).sort({ createdAt: -1 }).limit(3).lean();

  // Fetch Goodreads stats
  const currentlyReading = await GoodreadsBook.findOne({ bookshelves: { $regex: /currently-reading/i } }).lean();

  return (
    <div className="split-home-layout">

      {/* Top Paper Section */}
      <section style={{ backgroundColor: 'var(--overlay-white)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="container" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '0.5rem' }}>

          <IntroAnimation />

        </div>
      </section>

      {/* Torn Edge Divider */}
      <TornEdge fill="var(--overlay-white)" />

      {/* Bottom Dark Section */}
      <section className="container" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>

        {/* Typographic Inspiration & Quotes */}
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center', marginBottom: '4rem', marginTop: '2rem' }}>

          {/* LHS - Main Heading */}
          <div style={{ textAlign: 'left' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', fontWeight: 'normal', fontFamily: 'var(--font-sans)', fontStyle: 'italic', marginBottom: '0.2rem' }}>
              Come Lets
            </h2>
            <h1 className="home-hero-title" style={{ fontSize: '5rem', color: 'var(--overlay-white)', letterSpacing: '-2px', textShadow: '2px 2px 10px rgba(0,0,0,0.5)', marginBottom: '-1rem' }}>
              Escape
            </h1>
            <h2 className="home-hero-subtitle" style={{ fontSize: '2rem', color: 'var(--accent-color)', fontFamily: 'var(--font-sans)', textAlign: 'left', marginTop: '1rem' }}>
              for Few <span style={{ fontWeight: 900, fontSize: '2.5rem', marginLeft: '0.5rem', color: 'var(--text-primary)' }}>Moments.</span>
            </h2>
          </div>

          {/* Center - Rectangle Year Goal Badge */}
          <div className="goal-badge" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'start', marginLeft: '-2.5rem' }}>
            <div style={{
              padding: '1.5rem 2rem',
              border: '2px solid var(--accent-color)',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(225,198,153,0.06) 0%, rgba(15,15,15,0.95) 100%)',
              boxShadow: '0 0 20px rgba(225,198,153,0.1)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
            }}>
              <span style={{ fontSize: '0.6rem', color: 'var(--text-label)', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600 }}>2026 Goal</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                <span style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--accent-color)', lineHeight: 1, fontFamily: 'var(--font-serif)' }}>14</span>
                <span style={{ fontSize: '1.1rem', color: 'var(--text-label)', fontWeight: 400 }}>/</span>
                <span style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--overlay-white)', lineHeight: 1 }}>45</span>
              </div>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>books read</span>
            </div>
          </div>

          {/* RHS - Favorite Quotes & Widget */}
          <div className="quotes-panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '2.5rem' }}>

            {currentlyReading && (
              <div className="animate-fade-in" style={{ padding: '1.25rem', border: '1px solid var(--accent-hover)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-tertiary)', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '-10px', left: '15px', backgroundColor: 'var(--accent-color)', color: 'var(--bg-primary)', fontSize: '0.75rem', fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Currently Reading
                </span>
                <p style={{ fontWeight: 'bold', color: 'var(--overlay-white)', fontSize: '1.2rem', marginBottom: '0.2rem', marginTop: '0.5rem' }}>{currentlyReading.title}</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>by {currentlyReading.author}</p>
              </div>
            )}

            <figure style={{ margin: 0 }}>
              <blockquote style={{ fontSize: '1.2rem', color: 'var(--overlay-white)', fontStyle: 'italic', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                "For you, a thousand times over."
              </blockquote>
              <figcaption style={{ color: 'var(--text-label)', fontSize: '0.85rem', textAlign: 'right' }}>
                &mdash; The Kite Runner
              </figcaption>
            </figure>

            <figure style={{ margin: 0 }}>
              <blockquote style={{ fontSize: '1.2rem', color: 'var(--overlay-white)', fontStyle: 'italic', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                "They got me a long time ago."
              </blockquote>
              <figcaption style={{ color: 'var(--text-label)', fontSize: '0.85rem', textAlign: 'right' }}>
                &mdash; 1984
              </figcaption>
            </figure>

            <figure style={{ margin: 0 }}>
              <blockquote style={{ fontSize: '1.2rem', color: 'var(--overlay-white)', fontStyle: 'italic', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                "Hope is a good thing, maybe the best of things, and no good thing ever dies."
              </blockquote>
              <figcaption style={{ color: 'var(--text-label)', fontSize: '0.85rem', textAlign: 'right' }}>
                &mdash; The Shawshank Redemption
              </figcaption>
            </figure>

          </div>
        </div>

        {/* Content Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '3rem' }}>

          {/* Stories Column */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', textAlign: 'center' }}>Latest Stories</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontStyle: 'italic', textAlign: 'center' }}>Dive into original short stories crafted with care.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', flex: 1 }}>
              {stories.length > 0 ? stories.map(story => (
                <div key={story._id.toString()} style={{ borderLeft: '2px solid var(--accent-color)', paddingLeft: '1rem' }}>
                  <Link href={`/stories/${story._id.toString()}`} style={{ fontWeight: 'bold', color: 'var(--text-primary)', textDecoration: 'none', display: 'block', marginBottom: '0.25rem' }}>
                    {story.title}
                  </Link>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{story.description}</p>
                </div>
              )) : (
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No stories found.</p>
              )}
            </div>

            <Link href="/stories" className="btn-primary" style={{ marginTop: 'auto', alignSelf: 'center' }}>
              View All Stories
            </Link>
          </div>

          {/* Reviews Column */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', textAlign: 'center' }}>Book Reviews</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontStyle: 'italic', textAlign: 'center' }}>Critical looks at modern and classic fiction.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', flex: 1 }}>
              {reviews.length > 0 ? reviews.map(review => (
                <div key={review._id.toString()} style={{ borderLeft: '2px solid var(--accent-color)', paddingLeft: '1rem' }}>
                  <Link href={`/reviews/${review._id.toString()}`} style={{ fontWeight: 'bold', color: 'var(--text-primary)', textDecoration: 'none', display: 'block', marginBottom: '0.25rem' }}>
                    {review.title}
                  </Link>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>By {review.bookAuthor}</p>
                </div>
              )) : (
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No reviews found.</p>
              )}
            </div>

            <Link href="/reviews" className="btn-primary" style={{ marginTop: 'auto', alignSelf: 'center' }}>
              Browse All Reviews
            </Link>
          </div>

          {/* Analysis Column */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', textAlign: 'center' }}>Genre Breakdowns</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontStyle: 'italic', textAlign: 'center' }}>Deep dives into series mechanics.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', flex: 1 }}>
              {analyses.length > 0 ? analyses.map(analysis => (
                <div key={analysis._id.toString()} style={{ borderLeft: '2px solid var(--accent-color)', paddingLeft: '1rem' }}>
                  <Link href={`/analyses/${analysis._id.toString()}`} style={{ fontWeight: 'bold', color: 'var(--text-primary)', textDecoration: 'none', display: 'block', marginBottom: '0.25rem' }}>
                    {analysis.title}
                  </Link>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Target: {analysis.targetSubject}</p>
                </div>
              )) : (
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No analyses found.</p>
              )}
            </div>

            <Link href="/analyses" className="btn-primary" style={{ marginTop: 'auto', alignSelf: 'center' }}>
              Explore All Analysis
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
