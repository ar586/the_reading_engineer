import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env securely
dotenv.config({ path: path.join(__dirname, '../.env.local') });

import Story from '../models/Story.js';

async function importStories() {
    try {
        console.log('Connecting to MongoDB natively...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected!');

        const jsonPath = path.join(__dirname, '../story.stories.json');

        if (!fs.existsSync(jsonPath)) {
            throw new Error(`CRITICAL: JSON payload missing at ${jsonPath}`);
        }

        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const storiesArray = JSON.parse(rawData);

        console.log(`Detected ${storiesArray.length} raw manuscripts inside JSON.`);

        // Natively wipe any existing test stories to avoid duplication drift
        await Story.deleteMany({});
        console.log('Cleared existing Story records in database.');

        const docsToInsert = storiesArray.map(s => {
            // Natively resolve MongoDB $date BSON tags
            const dateStr = s.createdAt && s.createdAt.$date ? s.createdAt.$date : new Date();

            // Explode comma-separated string formats into an Array for genreTags
            const tagsStr = s.tags || "";
            const genreTags = tagsStr.split(',').map(tag => tag.trim()).filter(t => t.length > 0);

            // Map the dynamic 'category' tag internally as well if it exists
            if (s.category && s.category.trim().length > 0) {
                const cats = s.category.split(',').map(tag => tag.trim());
                cats.forEach(c => {
                    if (!genreTags.includes(c)) genreTags.push(c);
                });
            }

            return {
                title: s.title,
                slug: s.slug || "",
                description: s.excerpt || 'No description provided.',
                content: s.content,
                coverImage: s.thumbnail || "",
                genreTags: genreTags,
                isDraft: false,
                createdAt: new Date(dateStr)
            };
        });

        // Batch execute insertions natively
        const insertRes = await Story.insertMany(docsToInsert);

        console.log(`=========================================`);
        console.log(`Success: Inject pipeline securely merged ${insertRes.length} records into the Mongoose schema!`);
        process.exit(0);

    } catch (err) {
        console.error("FATAL SEQUENCE:", err);
        process.exit(1);
    }
}

importStories();
