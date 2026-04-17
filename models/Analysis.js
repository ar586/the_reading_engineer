import mongoose from 'mongoose';

const AnalysisSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide an analysis title'],
            maxlength: [150, 'Title cannot be more than 150 characters'],
        },
        targetSubject: {
            type: String, // The genre or series being analyzed
            required: [true, 'Please specify the target series or genre'],
        },
        coverImage: {
            type: String,
            trim: true
        },
        genreTags: [{
            type: String,
            trim: true
        }],
        publishedAt: {
            type: String,
            required: [true, 'Please provide the analysis content'],
        },
        content: {
            type: String,
            required: [true, 'Please provide the analysis content'],
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

export default mongoose.models.Analysis || mongoose.model('Analysis', AnalysisSchema);
