// components/ProductCard.tsx
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
};

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md transition-shadow duration-300 overflow-hidden group relative"
        >
            <div className="relative">
                <Link to={`/products/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>
            </div>
            <div className="p-4">
                <Link to={`/products/${product.id}`}>
                    <h3 className="text-base font-medium text-gray-800 line-clamp-1">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                </p>
            </div>

            <div className="flex items-center justify-between absolute top-3 right-3 bg-primary rounded-full px-1 py-1">
                <span className=" text-white text-xs font-medium px-2 py-1 rounded-full">
                    Ksh {product.price}
                </span>

                <button
                    className="p-1 rounded-full bg-white shadow hover:bg-gray-100 transition"
                    onClick={() => console.log('Added to cart:', product)}
                    aria-label={`Add ${product.name} to cart`}
                >
                    <ShoppingCart size={16} className="text-primary" />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
