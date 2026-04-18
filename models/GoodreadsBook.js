import mongoose from 'mongoose';

const GoodreadsBookSchema = new mongoose.Schema({
    bookId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    myRating: { type: Number, default: 0 },
    averageRating: { type: Number },
    publisher: { type: String },
    binding: { type: String },
    numberOfPages: { type: Number },
    yearPublished: { type: Number },
    originalPublicationYear: { type: Number },
    dateRead: { type: Date },
    dateAdded: { type: Date },
    bookshelves: { type: String },
    exclusiveShelf: { type: String },
    myReview: { type: String },
    coverImage: { type: String },
    isbn13: { type: String }
});

// Avoid OverwriteModelError in Next.js development
export default mongoose.models.GoodreadsBook || mongoose.model('GoodreadsBook', GoodreadsBookSchema);
