
import React, { useState, useEffect, type FormEvent } from 'react';
import type { Product } from './VendorProducts';


interface ProductFormProps {
    product?: Product;
    onSave: (product: Product) => void;
}

const ProductForm = ({ product, onSave }: ProductFormProps) => {
    const [formData, setFormData] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        discount: 0,
        stock: 0,
        category: '',
        brand: '',
        images: [''],
        isVisible: true,
    });

    useEffect(() => {
        if (product) setFormData(product);
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' || name === 'discount' || name === 'stock' ? Number(value) : value
        }));
    };

    const handleImageChange = (index: number, value: string) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData((prev) => ({ ...prev, images: newImages }));
    };

    const handleAddImage = () => {
        setFormData((prev) => ({ ...prev, images: [...prev.images, ''] }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave({ ...formData });
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold text-primary mb-2">{product ? 'Edit Product' : 'Create Product'}</h2>

                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Product Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Brand</label>
                        <input name="brand" value={formData.brand} onChange={handleChange} className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-muted-foreground mb-1">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                {/* Price & Stock */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Price (KES)</label>
                        <input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Discount (%)</label>
                        <input name="discount" type="number" value={formData.discount} onChange={handleChange} className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Stock</label>
                        <input name="stock" type="number" value={formData.stock} onChange={handleChange} className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm text-muted-foreground mb-1">Category</label>
                    <input name="category" value={formData.category} onChange={handleChange} className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                {/* Images */}
                <div>
                    <label className="block text-sm text-muted-foreground mb-2">Product Images (URLs)</label>
                    <div className="space-y-2">
                        {formData.images.map((url, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <input
                                    value={url}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    placeholder={`Image ${index + 1}`}
                                    className="flex-1 p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                {url && (
                                    <img src={url} alt={`Preview ${index + 1}`} className="w-12 h-12 rounded-md object-cover border" />
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={handleAddImage}
                        className="mt-2 text-sm text-primary hover:underline"
                    >
                        + Add Another Image
                    </button>
                </div>

                {/* Visibility */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={formData.isVisible}
                        onChange={(e) => setFormData((prev) => ({ ...prev, isVisible: e.target.checked }))}
                        className="accent-primary"
                    />
                    <label className="text-sm text-muted-foreground">Visible to customers</label>
                </div>

                <div>
                    <button
                        type="submit"
                        className="bg-primary hover:bg-primary/80 transition text-white font-semibold px-6 py-2 rounded-md shadow-sm"
                    >
                        {product ? 'Update Product' : 'Create Product'}
                    </button>
                </div>
            </form>

        </div>
    );
};

export default ProductForm;
