// components/ProductsSection.tsx
import React, { useEffect, useState } from 'react';

import { assets } from '@/assets';
import ProductCard from './cards/ProductCard';
import SearchBar from './SearchBar';
import { useLocation } from 'react-router';
import CustomSelect from './CustomSelect';

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

const AllProducts = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query')?.toLowerCase() || '';

    const [sortOrder, setSortOrder] = useState('Sort By Price:');
    const [displayedProducts, setDisplayedProducts] = useState<typeof sampleProducts>([])

    useEffect(() => {
        // Step 1: Filter (always from the original data)
        let filtered = query
            ? sampleProducts.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            )
            : [...sampleProducts];

        // Step 2: Sort
        if (sortOrder === 'Low to High') {
            filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'High to Low') {
            filtered = [...filtered].sort((a, b) => b.price - a.price);
        }

        setDisplayedProducts(filtered);
    }, [query, sortOrder]);

    // const filteredProducts = query
    //     ? sampleProducts.filter(product =>
    //         product.name.toLowerCase().includes(query) ||
    //         product.description.toLowerCase().includes(query)
    //     )
    //     : sampleProducts;

    // if (sortOrder === 'Low To High') {
    //     filteredProducts.sort((a, b) => a.price - b.price);
    // } else if (sortOrder === 'High To Low') {
    //     filteredProducts.sort((a, b) => b.price - a.price);
    // }


    return (
        <div className='screen-w mt-6'>
            <div className="relative">
                <SearchBar query={query} />

            </div>
            <div className="flex justify-end mt-4">
                <CustomSelect
                    selected={sortOrder}
                    onChange={setSortOrder}
                />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                {displayedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
