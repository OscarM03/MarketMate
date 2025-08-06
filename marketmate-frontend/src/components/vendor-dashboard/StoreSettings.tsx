import { assets } from '@/assets';
import React, { useState, useEffect, type FormEvent } from 'react';

interface StoreSettingsData {
    storeName: string;
    ownerName: string;
    email: string;
    phone: string;
    latitude: number;
    longitude: number;
    address: string;
    logoUrl: string;
    description: string;
}

const StoreSettings = () => {
    const [formData, setFormData] = useState<StoreSettingsData>({
        storeName: '',
        ownerName: '',
        email: '',
        phone: '',
        latitude: 0,
        longitude: 0,
        address: '',
        logoUrl: '',
        description: '',
    });

    useEffect(() => {
        // Simulate fetching vendor data
        const sampleData: StoreSettingsData = {
            storeName: 'Bright Tech Electronics',
            ownerName: 'Alice Wanjiku',
            email: 'alice@brighttech.com',
            phone: '+254712345678',
            latitude: -1.286389,
            longitude: 36.817223,
            address: '123 Biashara Street, Nairobi, Kenya',
            logoUrl: assets.image1,
            description: 'We sell high-quality electronics and gadgets at affordable prices.',
        };
        setFormData(sampleData);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Updated Store Settings:', formData);
        // Submit to API or state management logic here
    };

    return (
        <div className='screen-w !w-[95%] mt-6'>
            <h2 className="text-2xl font-semibold">Store Settings</h2>
            <form
                onSubmit={handleSubmit}
                className="space-y-8 bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 mt-6"
            >
            
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Store Name</label>
                        <input
                            name="storeName"
                            value={formData.storeName}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Owner Name</label>
                        <input
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Phone Number</label>
                        <input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Latitude</label>
                        <input
                            name="latitude"
                            type="number"
                            value={formData.latitude}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Longitude</label>
                        <input
                            name="longitude"
                            type="number"
                            value={formData.longitude}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-muted-foreground mb-1">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={2}
                        className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div>
                    <label className="block text-sm text-muted-foreground mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Images */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-muted-foreground mb-1">Logo URL</label>
                        <input
                            name="logoUrl"
                            value={formData.logoUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full p-3 rounded-md border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {formData.logoUrl && (
                            <img
                                src={formData.logoUrl}
                                alt="Store Logo"
                                className="w-16 h-16 mt-2 rounded-md object-cover border"
                            />
                        )}
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="bg-primary hover:bg-primary/80 transition text-white font-semibold px-6 py-2 rounded-md shadow-sm"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StoreSettings;
