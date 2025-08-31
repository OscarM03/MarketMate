import moongose from 'mongoose';


const reviewSchema = new moongose.Schema({
    reviewer: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    product: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Product',
        default: null
    },
    store: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Store',
        default: null
    }
}, { timestamps: true });

const Review = moongose.model('Review', reviewSchema);

export default Review;