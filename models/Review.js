import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a review title'],
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        bookAuthor: {
            type: String,
            required: [true, 'Please provide the book author name'],
        },
        coverImage: {
            type: String, // URL to an image
        },
        genreTags: [{
            type: String,
            trim: true
        }],
        rating: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot be more than 5'],
        },
        stats: {
            plot: { type: Number, min: 1, max: 10, default: 5 },
            writing: { type: Number, min: 1, max: 10, default: 5 },
            recommendability: { type: Number, min: 1, max: 10, default: 5 },
            sensitiveScale: { type: Number, min: 1, max: 10, default: 5 },
        },
        content: {
            type: String,
            required: [true, 'Please provide the review content'],
        },
        tags: {
            type: [String],
            default: [],
        },
        isDraft: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
