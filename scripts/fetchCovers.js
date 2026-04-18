import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env.local') });

import GoodreadsBook from '../models/GoodreadsBook.js';

async function fetchCovers() {
    try {
        console.log('Connecting to MongoDB natively...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected!');

        const books = await GoodreadsBook.find({});
        console.log(`Found ${books.length} total records inside the cluster.`);

        let updated = 0;
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

        for (const book of books) {
            if (book.coverImage && book.coverImage.length > 5) {
                // Skip if already secured securely
                continue;
            }

            const cleanTitle = book.title.replace(/\s*\(.*?\)\s*/g, '');

            try {
                // =============== GOOGLE BOOKS API ===============
                if (apiKey) {
                    const query = encodeURIComponent(`intitle:${cleanTitle}`);
                    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`;

                    const response = await fetch(url);
                    const data = await response.json();

                    if (data.items && data.items.length > 0) {
                        const volInfo = data.items[0].volumeInfo;
                        if (volInfo.imageLinks && volInfo.imageLinks.thumbnail) {
                            const secureUrl = volInfo.imageLinks.thumbnail.replace('http:', 'https:');
                            book.coverImage = secureUrl;
                            await book.save();
                            updated++;
                            console.log(`[Google Secured] Mapped thumbnail for: ${book.title}`);
                            await new Promise(resolve => setTimeout(resolve, 600));
                            continue; // Skip fallback natively
                        }
                    }
                    // Respect standard rate limiting
                    await new Promise(resolve => setTimeout(resolve, 600));
                }

                // =============== OPEN LIBRARY FALLBACK ===============
                console.log(`[Google Miss] Attempting OpenLibrary for: ${cleanTitle}`);
                const olUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(cleanTitle)}`;
                const olFetch = await fetch(olUrl);
                const olData = await olFetch.json();

                if (olData.docs && olData.docs.length > 0) {
                    const doc = olData.docs.find(d => d.cover_i);
                    if (doc) {
                        book.coverImage = `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
                        await book.save();
                        updated++;
                        console.log(`[OL Secured] Mapped thumbnail for: ${book.title}`);
                    } else {
                        console.log(`[OL Bypass] No cover_i found for: ${book.title}`);
                    }
                } else {
                    console.log(`[OL Bypass] Zero API search results for: ${book.title}`);
                }

                // Generous delay for OpenLibrary public endpoints to avoid DOS bans
                await new Promise(resolve => setTimeout(resolve, 1000));

            } catch (err) {
                console.error(`[Error] Failed pulling ${book.title}`, err.message);
            }
        }

        console.log(`=========================================`);
        console.log(`Pipeline Terminated: ${updated} structural covers successfully stored and mapped natively!`);
        process.exit(0);

    } catch (globalError) {
        console.error("FATAL SEQUENCE:", globalError);
        process.exit(1);
    }
}

fetchCovers();
