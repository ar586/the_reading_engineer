import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Story from '@/models/Story';
import Review from '@/models/Review';
import Analysis from '@/models/Analysis';

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const { type, ...data } = body;

        // Parse tags to array
        if (typeof data.tags === 'string') {
            data.tags = data.tags.split(',').map(t => t.trim()).filter(Boolean);
        }
        if (typeof data.genreTags === 'string') {
            data.genreTags = data.genreTags.split(',').map(t => t.trim()).filter(Boolean);
        }

        let createdDoc;
        if (type === 'story') {
            createdDoc = await Story.create(data);
        } else if (type === 'review') {
            // Ensure numerical parsing for stats and ratings
            data.rating = parseInt(data.rating) || 5;

            // Parse nested stats object if present
            if (data.stats) {
                data.stats.plot = parseInt(data.stats.plot) || 5;
                data.stats.writing = parseInt(data.stats.writing) || 5;
                data.stats.recommendability = parseInt(data.stats.recommendability) || 5;
                data.stats.sensitiveScale = parseInt(data.stats.sensitiveScale) || 5;
            }
            createdDoc = await Review.create(data);
        } else if (type === 'analysis') {
            createdDoc = await Analysis.create(data);
        } else {
            return NextResponse.json({ success: false, error: 'Invalid document type' }, { status: 400 })
        }

        return NextResponse.json({ success: true, data: createdDoc }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
