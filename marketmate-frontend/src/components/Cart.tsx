
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Minus, Plus } from 'lucide-react'
import { assets } from '@/assets'
import { Link } from 'react-router'

type CartItem = {
    id: string
    name: string
    price: number
    quantity: number
    image: string
}

const initialCart: CartItem[] = [
    {
        id: '1',
        name: 'Fresh Tomatoes',
        price: 250,
        quantity: 2,
        image: assets.image4,
    },
    {
        id: '2',
        name: 'Organic Onions',
        price: 180,
        quantity: 1,
        image: assets.image5,
    },
    {
        id: '3',
        name: 'Clean Potatoes',
        price: 320,
        quantity: 3,
        image: assets.image6,
    },
]

const CartPage = () => {
    const [cart, setCart] = useState<CartItem[]>(initialCart)

    const updateQuantity = (id: string, delta: number) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity: Math.max(1, item.quantity + delta),
                    }
                    : item
            )
        )
    }

    const removeItem = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div className="screen-w">
            <h2 className="text-lg font-bold mt-6">Your Cart</h2>
            <p className="text-sm text-gray-500 mt-1">
                Review your items before proceeding to checkout.
            </p>
            <div className="space-y-6 mt-6">
                {cart.map(item => (
                    <div
                        key={item.id}
                        className="flex justify-between items-center border-2 border-gray-300 p-4 rounded-xl"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="space-y-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-500">
                                    KES {item.price.toLocaleString()} × {item.quantity}
                                </p>

                                <div className="flex items-center gap-2 mt-2">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => updateQuantity(item.id, -1)}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => updateQuantity(item.id, 1)}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end justify-between h-full gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(item.id)}
                            >
                                <X className="w-4 h-4 text-red-500" />
                            </Button>
                            <p className="font-semibold">
                                KES {(item.price * item.quantity).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}

                {cart.length === 0 && (
                    <p className="text-gray-500 text-center py-20">
                        Your cart is empty.
                    </p>
                )}
            </div>

            <div className=" border-t mt-6">
                <div className="flex justify-between items-center mt-6">
                    <div className="text-xl font-bold">
                        Subtotal: KES {subtotal.toLocaleString()}
                    </div>
                    {cart.length > 0 && (
                        <Link to="/cart/checkout">
                            <Button className="btn">
                                Proceed to Checkout
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CartPage
