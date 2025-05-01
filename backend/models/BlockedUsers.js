import mongoose from 'mongoose';

const blockedUsersSchema = new mongoose.Schema({
    blockerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blockedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Create a compound index to ensure unique blocking relationships
blockedUsersSchema.index({ blockerId: 1, blockedId: 1 }, { unique: true });

const BlockedUsers = mongoose.model('BlockedUsers', blockedUsersSchema);

export default BlockedUsers; 