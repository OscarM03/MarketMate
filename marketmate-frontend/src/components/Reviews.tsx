'use client'
import React, { useState } from 'react'
import { Star } from 'lucide-react'

const Reviews = () => {
    const [reviews, setReviews] = useState([
        { id: 1, user: 'Mary', rating: 5, comment: 'Great service!' },
        { id: 2, user: 'John', rating: 4, comment: 'Fresh vegetables, arrived on time.' },
    ])

    const [newReview, setNewReview] = useState({ user: '', rating: 0, comment: '' })

    const averageRating = reviews.length
        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
        : 'No rating'

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (newReview.user && newReview.rating && newReview.comment) {
            setReviews([
                ...reviews,
                { ...newReview, id: Date.now() },
            ])
            setNewReview({ user: '', rating: 0, comment: '' })
        }
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Reviews</h2>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{averageRating}/5</span>
                </div>
            </div>

            {reviews.map((review) => (
                <div key={review.id} className="border-t border-gray-300 pt-2">
                    <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" /> {review.rating}/5
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                    <p className="text-xs text-gray-400 italic">- {review.user}</p>
                </div>
            ))}

            {/* Review Form */}
            <form onSubmit={handleSubmit} className="border-t border-gray-300 pt-4 space-y-3">
                <input
                    type="text"
                    placeholder="Your name"
                    value={newReview.user}
                    onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    required
                />

                <textarea
                    placeholder="Your comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    required
                />

                <div className="flex items-center gap-2">
                    <label className="text-sm">Rating:</label>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <Star
                            key={num}
                            className={`w-5 h-5 cursor-pointer ${num <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                            onClick={() => setNewReview({ ...newReview, rating: num })}
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                >
                    Submit Review
                </button>
            </form>
        </div>
    )
}

export default Reviews
