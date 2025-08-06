import React from "react"
import { TrendingUp, Star } from "lucide-react"
import { assets } from "@/assets"

const sampleTopProducts = [
    {
        id: 1,
        name: "Fresh Tomatoes",
        image: assets.image1,
        sold: 142,
    },
    {
        id: 2,
        name: "Moringa Powder",
        image: assets.image2,
        sold: 98,
    },
    {
        id: 3,
        name: "Maize Flour",
        image: assets.image3,
        sold: 85,
    },
    {
        id: 4,
        name: "Painkillers",
        image: assets.image4,
        sold: 76,
    },
]

const TopProducts = ({ products = sampleTopProducts }) => {
    const maxSold = Math.max(...products.map((p) => p.sold))

    return (
        <div className="w-full">
            <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Top Selling Products
                </h3>
            </div>

            <div className="grid gap-4 rounded-xl  shadow-md bg-white p-4 mt-4">
                {products.map((p, i) => ( 
                    <div
                        key={p.id}
                        className={`flex items-center justify-between p-3 rounded-lg transition duration-200 hover:shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
                            i === 0 ? "bg-blue-50 border-l-4 border-blue-500 dark:bg-blue-900/20" : ""
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={p.image}
                                alt={p.name}
                                className="w-12 h-12 rounded-md object-cover shadow-sm"
                            />
                            <div>
                                <div className="font-medium text-sm sm:text-base text-gray-800 dark:text-gray-100">
                                    {p.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {p.sold} units sold
                                </div>
                            </div>
                        </div>

                        <div
                            className={
                                "text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 " +
                                (p.sold === maxSold
                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/40 dark:text-yellow-300"
                                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300")
                            }
                        >
                            {p.sold === maxSold ? (
                                <>
                                    <Star className="w-4 h-4" />
                                    Best Seller
                                </>
                            ) : (
                                <>#{i + 1}</>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopProducts
