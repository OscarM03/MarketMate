import { assets } from '@/assets'
import React from 'react'
import { Link } from 'react-router'



export const recommendedProducts = [
    {
        id: 1,
        name: "Fresh Sukuma Wiki",
        description: "Locally sourced, crisp and clean for your daily meals.",
        price: 30,
        image: assets.image1, // Replace with actual asset path
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
]


const Recommended = () => {
    return (
        <div className='screen-w mt-6'>
            <h2 className="text-lg font-bold">Recommended for you</h2>
            <div className="flex gap-4 overflow-x-auto remove-scrollbar mt-6">
                {recommendedProducts.map((product) => (
                    <div
                        key={product.id}
                        className="min-w-[65%] sm:min-w-[400px] md:min-w-[350px] flex bg-white rounded-xl shadow-md overflow-hidden"
                    >
                        <div className='w-[50%]'>
                            <Link to={`/products/${product.id}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                        </div>
                        <div className="p-4 flex flex-col justify-between w-[50%]">
                            <div>
                                <Link to={`/products/${product.id}`}>
                                    <h3 className="text-base font-semibold line-clamp-2">{product.name}</h3>
                                </Link>
                                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                            </div>
                            <span className="text-sm font-bold text-primary mt-2">
                                Ksh {product.price}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Recommended
