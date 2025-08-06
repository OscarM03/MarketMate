
import React, { useState } from 'react';
import ProductForm from './ProductForm';
import { ProductTable } from './ProductTable';
import { assets } from '@/assets';
// import { ProductForm } from './_components/ProductForm';
// import { ProductTable } from './_components/ProductTable';


export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
    category: string;
    brand: string;
    images: string[];
    isVisible: boolean;
}

const sampleProducts: Product[] = [
    {
        id: '1',
        name: 'Fresh Sukuma Wiki',
        description: 'Locally grown sukuma wiki, harvested this morning.',
        price: 30,
        discount: 0,
        stock: 120,
        category: 'Vegetables',
        brand: 'GreenHarvest',
        images: [
            assets.image1,
        ],
        isVisible: true,
    },
    {
        id: '2',
        name: 'Pain Reliever Tablets',
        description: 'Fast relief for headaches and minor pains.',
        price: 150,
        discount: 10,
        stock: 80,
        category: 'Medicine',
        brand: 'QuickMed',
        images: [
            assets.image2,
        ],
        isVisible: true,
    },
    {
        id: '3',
        name: 'Tomatoes - 1Kg Pack',
        description: 'Farm-fresh red tomatoes, packed in 1Kg portions.',
        price: 70,
        discount: 0,
        stock: 200,
        category: 'Vegetables',
        brand: 'FarmPure',
        images: [
            assets.image3,
        ],
        isVisible: false,
    },
    {
        id: '4',
        name: 'Bottled Drinking Water - 1L',
        description: 'Pure mineral water in eco-friendly bottles.',
        price: 40,
        discount: 5,
        stock: 300,
        category: 'Beverages',
        brand: 'AquaLife',
        images: [
            assets.image4,
        ],
        isVisible: true,
    },
    {
        id: '5',
        name: 'Antiseptic Liquid - 500ml',
        description: 'Multi-purpose antiseptic for wounds and surfaces.',
        price: 250,
        discount: 20,
        stock: 60,
        category: 'Medicine',
        brand: 'SafeClean',
        images: [
            assets.image5,
        ],
        isVisible: true,
    },
];


const VendorProducts = () => {
    const [products, setProducts] = useState(sampleProducts);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleCreate = (product: Product) => {
        setProducts((prev) => [...prev, { ...product, id: Date.now().toString() }]);
    };

    const handleUpdate = (updated: Product) => {
        setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    };

    const handleDelete = (id: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <div className="screen-w !w-[95%] mt-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h1 className="text-2xl font-semibold">Manage Your Products</h1>

                <div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="btn"
                    >
                        Add New Product
                    </button>
                </div>

                {showForm && (
                    <div className="fixed inset-0 bg-black/60 bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-md w-[94%] md:w-[70%] h-[90%] overflow-y-auto relative shadow-lg">
                            <button
                                onClick={() => setShowForm(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                            >
                                ✕
                            </button>
                            <ProductForm
                                onSave={(product) => {
                                    handleCreate(product);
                                    setShowForm(false);
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="my-6">
                <ProductTable
                    vendorproducts={products}
                    onEdit={(product) => setEditingProduct(product)}
                    onDelete={handleDelete}
                />
            </div>

            {editingProduct && (
                <div className="fixed inset-0 bg-black/60 bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-[94%] md:w-[70%] h-[90%] overflow-y-auto relative shadow-lg">
                        <button
                            onClick={() => setEditingProduct(null)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black"
                        >
                            ✕
                        </button>
                        <ProductForm
                            product={editingProduct}
                            onSave={(updated) => {
                                handleUpdate(updated);
                                setEditingProduct(null);
                            }}
                        />
                    </div>
                </div>
            )}

        </div>
    );
}

export default VendorProducts;
