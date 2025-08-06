import React from 'react'
import { Card, CardContent } from './ui/card';
import { Check, X } from 'lucide-react';
import { assets } from '@/assets';

const sampleOrders = [
    {
        id: 'ORD12345',
        productName: 'Fresh Tomatoes',
        productImage: assets.image2,
        rating: 4,
        date: '2025-07-25',
        total: 'KES 1,200',
        picked_up: true,
        in_transit: true,
        delivered: false,
    },
    {
        id: 'ORD67890',
        productName: 'Maize Flour',
        productImage: assets.image3,
        rating: 5,
        date: '2025-07-20',
        total: 'KES 800',
        picked_up: true,
        in_transit: true,
        delivered: true,
    },
];

const Orders = () => {
    return (
        <div className="space-y-4">
            {sampleOrders.map((order) => (
                <Card key={order.id}>
                    <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex gap-4">
                            <img src={order.productImage} alt={order.productName} className="h-16 w-16 rounded object-cover" />
                            <div className="">
                                <p className="font-semibold">{order.productName}</p>
                                <p className="text-yellow-500">Rating: {order.rating} ★</p>
                                <p className='text-sm font-medium'>Total: {order.total}</p>
                                <p className='text-sm font-medium'>Order ID: {order.id}</p>
                                <p className='text-sm font-medium'>Date: {order.date}</p>
                            </div>
                        </div>
                        <div className="mt-2 flex gap-2">
                            <button
                                className={`btn flex items-center gap-1 ${order.picked_up ? '!bg-green-500' : ''}`}
                            >
                                Pick Up
                                {order.picked_up ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            </button>

                            <button
                                className={`btn flex items-center gap-1 ${order.in_transit ? '!bg-green-500' : ''}`}
                            >
                                In Transit
                                {order.in_transit ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            </button>

                            <button
                                className={`btn flex items-center gap-1 ${order.delivered ? '!bg-green-500' : ''}`}
                            >
                                Delivered
                                {order.delivered ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                            </button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default Orders
