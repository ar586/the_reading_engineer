import Link from 'next/link';
import IntroAnimation from '@/components/IntroAnimation';
import TornEdge from '@/components/TornEdge';
import dbConnect from '@/lib/mongodb';
import Story from '@/models/Story';
import Review from '@/models/Review';
import Analysis from '@/models/Analysis';

// Tells Next.js not to statically cache this page so new database additions show immediately
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Connect to cluster
  await dbConnect();

  // Fetch the 3 most recent entries for each category
  const stories = await Story.find({ isDraft: false }).sort({ createdAt: -1 }).limit(3).lean();
  const reviews = await Review.find().sort({ createdAt: -1 }).limit(3).lean();
  const analyses = await Analysis.find().sort({ createdAt: -1 }).limit(3).lean();

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

        {/* Typographic Inspiration */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', fontWeight: 'normal', fontFamily: 'var(--font-sans)', fontStyle: 'italic', marginBottom: '0.2rem' }}>
            fiction doesn't
          </h2>
          <h1 style={{ fontSize: '5rem', color: 'var(--overlay-white)', letterSpacing: '-2px', textShadow: '2px 2px 10px rgba(0,0,0,0.5)', marginBottom: '-1rem' }}>
            Care.
          </h1>
          <h2 style={{ fontSize: '2rem', color: 'var(--accent-color)', fontFamily: 'var(--font-sans)', textAlign: 'center', marginTop: '1rem' }}>
            until you <span style={{ fontWeight: 900, fontSize: '2.5rem', marginLeft: '0.5rem', color: 'var(--text-primary)' }}>READ.</span>
          </h2>
        </div>

        {/* Content Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>

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
              Explore All Analyses
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
