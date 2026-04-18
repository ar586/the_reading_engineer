import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env securely
dotenv.config({ path: path.join(__dirname, '../.env.local') });

import GoodreadsBook from '../models/GoodreadsBook.js';

function parseCSVRow(row) {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < row.length; i++) {
        if (row[i] === '"') {
            inQuotes = !inQuotes;
        } else if (row[i] === ',' && !inQuotes) {
            result.push(cur);
            cur = '';
        } else {
            cur += row[i];
        }
    }
    result.push(cur);
    return result;
}

async function patchIsbnAndFetch() {
    try {
        console.log('Connecting to MongoDB natively...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected!');

        const csvPath = path.join(__dirname, '../goodreads_library_export-2.csv');
        const data = fs.readFileSync(csvPath, 'utf8');
        const rows = data.split('\n').filter(r => r.trim() !== '');

        let patchedIsbns = 0;
        let securedCovers = 0;

        // Pass 1: Extract ISBNs from CSV and patch MongoDB
        for (let i = 1; i < rows.length; i++) {
            const cols = parseCSVRow(rows[i]);
            if (cols.length < 10) continue;

            const bookId = cols[0];
            const isbn13Raw = cols[6] || '';
            const isbn13Clean = isbn13Raw.replace(/[^0-9X]/gi, ''); // Strip the ="978..." artifacts completely

            if (isbn13Clean.length >= 10) {
                const doc = await GoodreadsBook.findOne({ bookId });
                if (doc && !doc.isbn13) {
                    doc.isbn13 = isbn13Clean;
                    await doc.save();
                    patchedIsbns++;
                }
            }
        }

        console.log(`Successfully patched ${patchedIsbns} native ISBN codes into the cluster.`);

        // Pass 2: Iterate over missing covers and use OpenLibrary ISBN API with HTTP HEAD validation
        const missing = await GoodreadsBook.find({ $or: [{ coverImage: { $exists: false } }, { coverImage: '' }] });
        console.log(`Analyzing ${missing.length} records missing visual mapping...`);

        for (const book of missing) {
            if (!book.isbn13) {
                console.log(`[Bypass] ${book.title} completely lacks a valid ISBN reference.`);
                continue;
            }

            try {
                // To avoid 1x1 blank pixel placeholder, we append ?default=false which guarantees a 404 if missing
                const targetUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn13}-L.jpg?default=false`;

                // Natively evaluate the network header directly before injecting image tags
                const response = await fetch(targetUrl, { method: 'HEAD' });

                if (response.ok) {
                    book.coverImage = `https://covers.openlibrary.org/b/isbn/${book.isbn13}-L.jpg`;
                    await book.save();
                    securedCovers++;
                    console.log(`[ISBN Secured] Extracted secure OpenLibrary cover for: ${book.title}`);
                } else {
                    console.log(`[ISBN Bypass] OpenLibrary database lacks cover file for: ${book.title} (${book.isbn13})`);
                }

                // Wait structurally to protect IP reputation
                await new Promise(resolve => setTimeout(resolve, 800));

            } catch (err) {
                console.error(`[Error] Hit network snag mapping ${book.title}`, err.message);
            }
        }

        console.log(`=========================================`);
        console.log(`Pipeline Terminated: ${securedCovers} strictly verified ISBN covers successfully stored natively!`);
        process.exit(0);

    } catch (err) {
        console.error("FATAL SEQUENCE:", err);
        process.exit(1);
    }
}

patchIsbnAndFetch();
