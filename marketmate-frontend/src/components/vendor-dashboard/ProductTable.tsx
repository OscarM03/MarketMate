import React, { useMemo, useState } from 'react'
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import type { Product } from './VendorProducts'

// interface Product {
//     id: string
//     name: string
//     price: number
//     stock: number
//     discount: number
//     brand: string
//     category: string
//     isVisible: boolean
//     images: string[]
// }

interface ProductTableProps {
    vendorproducts: Product[]
    onEdit: (product: Product) => void
    onDelete: (productId: string) => void
}

export const ProductTable = ({
    vendorproducts,
    onEdit,
    onDelete
} : ProductTableProps) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [showOnlyVisibleProducts, setShowOnlyVisibleProducts] = useState(false)
    const [sortAttribute, setSortAttribute] = useState<'name' | 'price' | 'stock'>('name')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    const filteredProducts = useMemo(() => {
        let productsList = vendorproducts

        if (showOnlyVisibleProducts) {
            productsList = productsList.filter(product => product.isVisible)
        }

        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase()
            productsList = productsList.filter(product =>
                product.name.toLowerCase().includes(lowerCaseQuery) ||
                product.category.toLowerCase().includes(lowerCaseQuery) ||
                product.brand.toLowerCase().includes(lowerCaseQuery)
            )
        }

        productsList = [...productsList].sort((productA, productB) => {
            let valueA: string | number = productA[sortAttribute]
            let valueB: string | number = productB[sortAttribute]

            if (sortAttribute === 'name') {
                valueA = typeof valueA === 'string' ? valueA.toLowerCase() : valueA
                valueB = typeof valueB === 'string' ? valueB.toLowerCase() : valueB
            }

            if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1
            if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1
            return 0
        })

        return productsList
    }, [vendorproducts, searchQuery, showOnlyVisibleProducts, sortAttribute, sortDirection])

    const toggleSort = (key: typeof sortAttribute) => {
        if (sortAttribute === key) {
            setSortDirection(current =>
                current === 'asc' ? 'desc' : 'asc'
            )
        } else {
            setSortAttribute(key)
            setSortDirection('asc')
        }
    }

    return (
        <div className="rounded-lg border bg-white overflow-hidden shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b">
                <div className="flex gap-2 flex-wrap">
                    <input
                        placeholder="Search name/category/brand"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-3 py-2 border rounded-md w-full sm:w-64"
                    />
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={showOnlyVisibleProducts}
                            onChange={() => setShowOnlyVisibleProducts(v => !v)}
                            className="accent-primary"
                        />
                        Visible only
                    </label>
                </div>

                <div className="flex gap-3">
                    <div className="flex items-center gap-1 text-sm">
                        Sort by:
                        {(['name', 'price', 'stock'] as const).map((key) => (
                            <button
                                key={key}
                                onClick={() => toggleSort(key)}
                                className={`px-2 py-1 rounded ${sortAttribute === key ? 'bg-primary/10 font-semibold' : 'hover:bg-gray-100'}`}
                            >
                                {key[0].toUpperCase() + key.slice(1)}{' '}
                                {sortAttribute === key && (sortDirection === 'asc' ? '↑' : '↓')}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-4 py-3 text-xs font-semibold uppercase">Product</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase">Category</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase">Price</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase">Stock</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase">Visibility</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-500">
                                    No products match your criteria.
                                </td>
                            </tr>
                        )}
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-12 h-12 rounded object-cover flex-shrink-0"
                                    />
                                    <div className="flex flex-col">
                                        <div className="font-medium">{product.name}</div>
                                        <div className="text-xs text-gray-500">{product.brand}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">{product.category}</td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col">
                                        <span className="font-semibold">KES {product.price.toFixed(2)}</span>
                                        {product.discount > 0 && (
                                            <span className="text-xs text-yellow-600">
                                                {product.discount}% off
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-3">{product.stock}</td>
                                <td className="px-4 py-3">
                                    {product.isVisible ? (
                                        <div className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                                            <Eye size={14} /> Visible
                                        </div>
                                    ) : (
                                        <div className="inline-flex items-center gap-1 text-gray-500 text-xs font-medium">
                                            <EyeOff size={14} /> Hidden
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-right flex gap-2 justify-end">
                                    <button
                                        onClick={() => onEdit(product)}
                                        aria-label="Edit"
                                        className="p-2 rounded hover:bg-gray-100"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => product.id && onDelete(product.id)}
                                        aria-label="Delete"
                                        className="p-2 rounded hover:bg-red-100 text-red-600"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
