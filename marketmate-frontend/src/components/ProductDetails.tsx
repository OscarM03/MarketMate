// ProductDetails.tsx
import { useState } from 'react'
import { ShoppingCart, Minus, Plus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { assets } from '@/assets';
import { Link, useParams } from 'react-router';
import ProductCard from './cards/ProductCard';

const sampleProducts = [
    {
        id: 1,
        name: "Fresh Sukuma Wiki",
        description: "Locally sourced, crisp and clean for your daily meals.",
        price: 30,
        category: "Vegetables",
        unit: "bunch",
        source: "Local farm in Kiambu",
        image: assets.image1,
        images: [assets.image1, assets.image2, assets.image3, assets.image4, assets.image5, assets.image6],
        store: {
            id: 1,
            name: "Kiambu Fresh Produce",
            slogan: "Fresh from our farm to your table",
            image: assets.image1, // Placeholder for store image
        }
    },
    {
        id: 2,
        name: "Matoke Bananas",
        description: "Perfect for stew or boiling, straight from Kisii farms.",
        price: 120,
        category: "Fruits",
        unit: "kg",
        source: "Kisii Banana Growers",
        image: assets.image2,
        images: [assets.image1, assets.image2, assets.image3],
    },
    {
        id: 3,
        name: "500g Unga Wa Dola",
        description: "High quality maize flour for smooth and soft ugali.",
        price: 65,
        category: "Groceries",
        unit: "500g",
        source: "Dola Foods Ltd",
        image: assets.image3,
        images: [assets.image1, assets.image2, assets.image3],
    },
    {
        id: 4,
        name: "Fresh Cow Milk (1L)",
        description: "Raw farm milk delivered fresh to your doorstep.",
        price: 70,
        category: "Dairy",
        unit: "Litre",
        source: "Kiambu Dairy Cooperative",
        image: assets.image4,
        images: [assets.image1, assets.image2, assets.image3],
    },
    {
        id: 5,
        name: "Tilapia Fish (Whole, Cleaned)",
        description: "Caught fresh daily, ready for deep frying or grilling.",
        price: 350,
        category: "Seafood",
        unit: "per fish",
        source: "Lake Victoria Fishermen Co.",
        image: assets.image5,
        images: [assets.image1, assets.image2, assets.image3],
    },
    {
        id: 6,
        name: "Tomato Mix (1kg)",
        description: "Juicy, red tomatoes perfect for sauces and stews.",
        price: 90,
        category: "Vegetables",
        unit: "kg",
        source: "Murang'a Farmers Market",
        image: assets.image6,
        images: [assets.image1, assets.image2, assets.image3],
    },
    {
        id: 7,
        name: "Pain Relief Tablets",
        description: "Effective relief for headaches and minor pains.",
        price: 50,
        category: "Pharmacy",
        unit: "pack",
        source: "MediHealth Distributors",
        image: assets.image7,
        images: [assets.image1, assets.image2, assets.image3],
    },
    {
        id: 8,
        name: "Family Bread – Large",
        description: "Soft and fluffy bread for the whole family.",
        price: 60,
        category: "Bakery",
        unit: "loaf",
        source: "Nairobi Bakers",
        image: assets.image8,
        images: [assets.image1, assets.image2, assets.image3],
    },
];


const ProductDetails = () => {

    const { id } = useParams()
    const product = sampleProducts.find(p => p.id === parseInt(id || '0'));
    const [selectedImage, setSelectedImage] = useState(
        product?.images?.[0] ?? ''
    );
    const [quantity, setQuantity] = useState(1)
    const unit = product?.unit || 'item' // default fallback
    const totalPrice = product?.price ? product.price * quantity : 0

    const similarProducts = sampleProducts
        .filter(p => p.category === product?.category && p.id !== product?.id)
        .slice(0, 4)

    return (
        <div className="screen-w">
            <h1 className="font-medium my-2">
                <Link to="/products" className="text-primary">products</Link> / {product?.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2  mt-1">
                {/* Left Pane: Image Showcase */}
                <div className="flex flex-col gap-4 ">
                    <div className="aspect-square rounded-xl overflow-hidden shadow-md h-[400px]">
                        <img
                            src={selectedImage}
                            alt={product?.name}
                            className="w-full h-full object-cover transition-all duration-500"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto max-w-full">
                        {product?.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                onClick={() => setSelectedImage(img)}
                                className={cn(
                                    'w-20 h-20 object-cover rounded-lg cursor-pointer border-2',
                                    selectedImage === img
                                        ? 'border-primary'
                                        : 'border-transparent'
                                )}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Pane: Details & Actions */}
                <div className="flex flex-col md:px-6 max-md:mt-6 gap-8">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-gray-900">{product?.name}</h1>
                        <p className="text-sm text-gray-500">{product?.category}</p>

                        <div className="text-primary font-bold text-xl">
                            KES {product?.price} <span className="text-sm font-normal text-gray-500">/ {unit}</span>
                        </div>

                        <p className="text-gray-700 text-sm">{product?.description}</p>

                        {/* Optional fields */}
                        {product?.source && (
                            <p className="text-xs text-gray-500">Source: {product?.source}</p>
                        )}

                        {/* Quantity selector */}
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center border-2 border-primary rounded-md px-2">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="p-1"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="px-3">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="p-1"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500">Quantity</p>
                        </div>

                        {/* Total */}
                        <p className="text-sm mt-2">
                            Total: <span className="font-semibold text-gray-800">KES {totalPrice}</span>
                        </p>

                        {/* Availability */}
                        <p className="text-xs text-green-600">In stock</p>
                        {/* Store Profile */}
                        <div className="mt-4 p-4 border-2 border-primary rounded-xl bg-gray-50 hover:shadow transition">
                            <Link to={`/stores/${product?.store?.id}`} className="flex items-center gap-4">
                                <img
                                    src={product?.store?.image || '/store-placeholder.png'}
                                    alt={product?.store?.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-800">{product?.store?.name}</h3>
                                    {product?.store?.slogan && (
                                        <p className="text-xs text-gray-500">{product.store.slogan}</p>
                                    )}
                                </div>
                            </Link>
                        </div>

                    </div>


                    <div className="space-y-2">
                        <div className='flex gap-2'>
                            <Button className="w-[50%] ">
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Add to Cart
                            </Button>
                            <Link to="/cart" className='w-[50%]'>
                                <Button className='w-full'>
                                    <ShoppingBag className="w-5 h-5 mr-2" />
                                    Buy Now
                                </Button>
                            </Link>
                        </div>
                        <Link to='/stores/1'>
                            <Button variant="ghost" className="w-full text-gray-500 text-sm">
                                Need help? Contact seller →
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <h2 className="text-lg font-bold mt-6">Other products you may like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
                {similarProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default ProductDetails;