import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { assets } from '@/assets';
import { useLocation } from 'react-router';
import StoreCard from './cards/StoreCard';

export interface Store {
    id: number;
    name: string;
    slogan: string;
    image: string;
    location: string;
    productCount: number;
}

export const sampleStores: Store[] = [
    {
        id: 1,
        name: "Kiambu Fresh Produce",
        slogan: "Fresh from our farm to your table",
        image: assets.image1,
        location: "Kiambu County",
        productCount: 12,
    },
    {
        id: 2,
        name: "Kisii Banana Zone",
        slogan: "Home of sweet Matoke",
        image: assets.image2,
        location: "Kisii",
        productCount: 8,
    },
    {
        id: 3,
        name: "Dola Food Mart",
        slogan: "Trusted since 1996",
        image: assets.image3,
        location: "Nairobi",
        productCount: 15,
    },
    {
        id: 4,
        name: "Milkman Dairy",
        slogan: "Pure, raw, farm-fresh",
        image: assets.image4,
        location: "Limuru",
        productCount: 6,
    },
    {
        id: 5,
        name: "Lake Victoria Fishers",
        slogan: "Daily catch, never frozen",
        image: assets.image5,
        location: "Kisumu",
        productCount: 9,
    },
    {
        id: 6,
        name: "Murang'a Farmer's Market",
        slogan: "Best tomatoes and more",
        image: assets.image6,
        location: "Murang’a",
        productCount: 11,
    },
    {
        id: 7,
        name: "MediHealth Distributors",
        slogan: "Your trusted pharmacy",
        image: assets.image7,
        location: "Thika",
        productCount: 20,
    },
    {
        id: 8,
        name: "Nairobi Bakers",
        slogan: "Baking smiles daily",
        image: assets.image8,
        location: "Nairobi",
        productCount: 14,
    },
    {
        id: 9,
        name: "Karatina Greens",
        slogan: "Organic from the slopes",
        image: assets.image1,
        location: "Nyeri",
        productCount: 7,
    },
    {
        id: 10,
        name: "Machakos Essentials",
        slogan: "Everyday market needs",
        image: assets.image2,
        location: "Machakos",
        productCount: 18,
    },
];


const Stores = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query')?.toLowerCase() || '';

    const [filteredStores, setFilteredStores] = useState<typeof sampleStores>([]);

    useEffect(() => {
        const results = query
            ? sampleStores.filter(
                store =>
                    store.name.toLowerCase().includes(query) ||
                    store.slogan.toLowerCase().includes(query)
            )
            : sampleStores;

        setFilteredStores(results);
    }, [query]);

    return (
        <div className="screen-w mt-6">
            <SearchBar query={query} />

            <h2 className="text-xl font-bold my-4">Browse Stores</h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                {filteredStores.map(store => (
                    <StoreCard key={store.id} store={store} />
                ))}
            </div>
        </div>
    );
};

export default Stores;
