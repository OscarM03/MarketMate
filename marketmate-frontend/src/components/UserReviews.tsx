import React from 'react'
import { Card, CardContent } from './ui/card'

const sampleReviews = [
    {
        id: 'REV123',
        productName: 'Fresh Tomatoes',
        productImage: 'https://via.placeholder.com/60',
        content: 'Great quality, fresh and juicy.',
        rating: 4,
    },
    {
        id: 'REV456',
        productName: 'Maize Flour',
        productImage: 'https://via.placeholder.com/60',
        content: 'Fine texture, made soft ugali.',
        rating: 5,
    },
    {
        id: 'REV789',
        productName: 'Sukuma Wiki',
        productImage: 'https://via.placeholder.com/60',
        content: 'Very fresh and tasty, highly recommend!',
        rating: 4.5,
    },
];

const UserReviews = () => {
    return (
        <div className="space-y-4">
            {sampleReviews.map((review) => (
                <Card key={review.id}>
                    <CardContent className="p-4 flex items-start gap-4">
                        <img src={review.productImage} alt={review.productName} className="h-16 w-16 rounded object-cover" />
                        <div className="flex-1">
                            <p className="font-semibold">{review.productName}</p>
                            <p>{review.content}</p>
                            <p className="text-yellow-500">Rating: {review.rating} ★</p>
                            <div className="mt-2 flex gap-2">
                                <button className='btn'>Edit</button>
                                <button className='btn'>Delete</button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default UserReviews
