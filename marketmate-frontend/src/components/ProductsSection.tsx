// components/ProductsSection.tsx
import React from 'react';

import { assets } from '@/assets';
import ProductCard from './cards/ProductCard';
import { Link } from 'react-router';

const sampleProducts = [
    {
        id: 1,
        name: "Fresh Sukuma Wiki",
        description: "Locally sourced, crisp and clean for your daily meals.",
        price: 30,
        image: assets.image1,
    },
    {
        id: 2,
        name: "Matoke Bananas",
        description: "Perfect for stew or boiling, straight from Kisii farms.",
        price: 120,
        image: assets.image2,
    },
    {
        id: 3,
        name: "500g Unga Wa Dola",
        description: "High quality maize flour for smooth and soft ugali.",
        price: 65,
        image: assets.image3,
    },
    {
        id: 4,
        name: "Fresh Cow Milk (1L)",
        description: "Raw farm milk delivered fresh to your doorstep.",
        price: 70,
        image: assets.image4,
    },
    {
        id: 5,
        name: "Tilapia Fish (Whole, Cleaned)",
        description: "Caught fresh daily, ready for deep frying or grilling.",
        price: 350,
        image: assets.image5,
    },
    {
        id: 6,
        name: "Tomato Mix (1kg)",
        description: "Juicy, red tomatoes perfect for sauces and stews.",
        price: 90,
        image: assets.image6,
    },
    {
        id: 7,
        name: "Pain Relief Tablets",
        description: "Effective relief for headaches and minor pains.",
        price: 50,
        image: assets.image7,
    },
    {
        id: 8,
        name: "Family Bread – Large",
        description: "Soft and fluffy bread for the whole family.",
        price: 60,
        image: assets.image8,
    },
];

const ProductsSection = () => {
    return (
        <div className='screen-w mt-6'>
            <h2 className="text-lg font-bold">Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                {sampleProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="mt-6 text-center">
                <Link to="/products">
                    <button className='btn'>
                        See More
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductsSection;
