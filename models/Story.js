import mongoose from 'mongoose';

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a short description'],
    },
    coverImage: {
        type: String,
        trim: true
    },
    genreTags: [{
        type: String,
        trim: true
    }],
    content: {
        type: String,
        required: [true, 'Please provide the story content'],
    },
    isDraft: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Story || mongoose.model('Story', StorySchema);
