// components/VendorReviews.tsx
import { assets } from '@/assets'
import { Star } from 'lucide-react'
import React from 'react'

const sampleReviews = [
    {
        id: 1,
        product: {
            name: 'Fresh Spinach Bundle',
            image: assets.image1,
        },
        reviewer: 'Jane Doe',
        rating: 4.0,
        comment: 'Very fresh and arrived quickly! Will order again.',
        date: '2025-07-28',
    },
    {
        id: 2,
        product: {
            name: 'Organic Tomatoes',
            image: assets.image2,
        },
        reviewer: 'David M.',
        rating: 5.0,
        comment: 'Sweet and juicy. Excellent quality.',
        date: '2025-07-24',
    },
    {
        id: 3,
        product: {
            name: 'Whole Grain Maize Flour',
            image: assets.image3,
        },
        reviewer: 'Achieng',
        rating: 3.5,
        comment: 'Good but packaging could be better.',
        date: '2025-07-22',
    },
    {
        id: 4,
        product: {
            name: 'Pain Relief Tablets',
            image: assets.image4,
        },
        reviewer: 'John K.',
        rating: 4.5,
        comment: 'Effective and fast relief. Highly recommend.',
        date: '2025-07-20',
    },
]
const VendorReviews = () => {
    return (
        <div className="screen-w !w-[95%] mt-6 ">
            <h2 className="text-lg font-semibold">Product Reviews</h2>

            <div className="p-4 space-y-6 border rounded-lg shadow-sm bg-white mt-6">
                {sampleReviews.map((review) => (
                    <div
                        key={review.id}
                        className="flex flex-col sm:flex-row sm:items-start gap-4 not-last:border-b pb-4"
                    >
                        {/* Product Image */}
                        <img
                            src={review.product.image}
                            alt={review.product.name}
                            className="w-16 h-16 rounded object-cover border"
                        />

                        {/* Review Content */}
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium text-base">{review.product.name}</h3>
                                <span className="text-xs text-gray-500">{review.date}</span>
                            </div>

                            <p className="text-sm text-gray-800 mt-1">
                                <span className="flex items-center gap-1 font-medium">
                                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                    {review.rating}
                                </span>
                            </p>

                            <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                            <p className="text-xs text-gray-500 mt-1">— {review.reviewer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VendorReviews
