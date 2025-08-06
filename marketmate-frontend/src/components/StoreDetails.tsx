import React from 'react'
import { Clock, Facebook, Instagram, Mail, Phone, Star } from 'lucide-react'
import Reviews from './Reviews'
import { assets } from '@/assets'

const StoreDetails = () => {

    const store = {
        name: 'Greens Market',
        description: 'A trusted vendor for fresh produce.',
        phone: '+254 700 123456',
        email: 'greensmarket@example.com',
        image: assets.image1,
        location: {
            lat: -1.2921,
            lng: 36.8219,
            address: 'Moi Avenue, Nairobi'
        },
        social: {
            facebook: 'https://facebook.com/greensmarket',
            instagram: 'https://instagram.com/greensmarket',
        },
        hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
        rating: 4.5
    }
    const mapSrc = `https://maps.google.com/maps?q=${store.location.lat},${store.location.lng}&z=15&output=embed`

    return (
        <div className="screen-w mt-6 space-y-6">
            <div className="rounded-2xl shadow-lg p-6 md:p-8 bg-white space-y-6 md:flex md:gap-8">
                {/* Store Image */}
                <div className="flex justify-center md:block md:w-1/3">
                    <img
                        src={store.image}
                        alt={store.name}
                        className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full border-4 border-primary"
                    />
                </div>

                {/* Store Details */}
                <div className="flex-1 space-y-4 text-gray-800">
                    <div>
                        <h1 className="text-3xl font-bold">{store.name}</h1>
                        <p className="text-gray-600 mt-2">{store.description}</p>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {store.phone && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-primary" />
                                <a href={`tel:${store.phone}`} className="text-blue-600 hover:underline">
                                    {store.phone}
                                </a>
                            </div>
                        )}
                        {store.email && (
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-primary" />
                                <a href={`mailto:${store.email}`} className="text-blue-600 hover:underline">
                                    {store.email}
                                </a>
                            </div>
                        )}
                        {store.hours && (
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary" />
                                <span>{store.hours}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <span>{store.rating || "N/A"}/5</span>
                        </div>
                    </div>


                    {/* Social Links */}
                    {store.social && (
                        <div className="flex items-center gap-4 mt-4">
                            {store.social.facebook && (
                                <a
                                    href={store.social.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-blue-600 hover:underline"
                                >
                                    <Facebook className="w-4 h-4" /> Facebook
                                </a>
                            )}
                            {store.social.instagram && (
                                <a
                                    href={store.social.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-pink-500 hover:underline"
                                >
                                    <Instagram className="w-4 h-4" /> Instagram
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>


            <div className="bg-white rounded-xl shadow-md p-4">
                <h2 className="text-lg font-semibold mb-2">Location</h2>
                <p className="text-sm text-gray-600 mb-2">{store.location.address}</p>
                <div className="w-full h-[300px]">
                    <iframe
                        src={mapSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
            <Reviews />
            {/* <ProductList storeId="store-123" /> */}
        </div>
    )
}

export default StoreDetails
