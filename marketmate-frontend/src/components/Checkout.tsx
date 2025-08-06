import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { getDistanceFromLatLonInKm } from "@/lib/utils"
import { Link, useNavigate } from "react-router"

const Checkout = () => {
    const [lat, setLat] = useState(-1.2921) // Default to Nairobi
    const [lng, setLng] = useState(36.8219)
    const [locationLoaded, setLocationLoaded] = useState(false)
    const [fullName, setFullName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [deliveryNotes, setDeliveryNotes] = useState("")
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();

    const storeLat = -1.69223;
    const storeLng = 36.84492;

    const total = 1400; // Example total amount
    const distance = getDistanceFromLatLonInKm(lat, lng, storeLat, storeLng);
    const deliveryFee = Math.round(distance * 100);

    const totalWithDelivery = total + deliveryFee;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!fullName || !phoneNumber) {
            setError("Please fill in your full name and phone number.")
            return
        }
        if (phoneNumber.length < 10) {
            setError("Please enter a valid phone number.")
            return
        }
        if (lat === -1.2921 && lng === 36.8219) {
            setError("Please allow location access to get your current location for easy delivery.")
            return
        }
        console.log("Order placed with details:", {
            fullName,
            phoneNumber,
            deliveryNotes,
            location: { lat, lng },
            totalWithDelivery
        })

        navigate("/profile", {
            state: { tab: 'orders' }
        })
    }


    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude)
                    setLng(position.coords.longitude)
                    setLocationLoaded(true)
                },
                (error) => {
                    console.warn("Geolocation failed or denied:", error)
                    setLocationLoaded(true) // Still show map with default
                }
            )
        } else {
            console.warn("Geolocation not supported.")
            setLocationLoaded(true)
        }
    }, [])

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-12">
            <h2 className="text-3xl font-bold text-gray-800">Checkout</h2>

            {/* DELIVERY INFORMATION */}
            <div className="space-y-6">
                <h3 className="text-xl font-semibold">Delivery Details</h3>
                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className="border p-3 rounded-md"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => {
                            setFullName(e.target.value)
                            setError(null)
                        }}
                    />
                    <input className="border p-3 rounded-md"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value)
                            setError(null)
                        }}
                    />

                    <textarea
                        className="md:col-span-2 border p-3 rounded-md"
                        placeholder="Delivery Notes or Landmark (optional)"
                        rows={3}
                        value={deliveryNotes}
                        onChange={(e) => {
                            setDeliveryNotes(e.target.value)
                            setError(null)
                        }}
                    />
                </form>

                <div className="pt-4">
                    <h4 className="text-md font-medium mb-2">Your Location</h4>
                    <div className="border h-64 w-full rounded-lg overflow-hidden bg-gray-100">
                        {locationLoaded ? (
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
                            />
                        ) : (
                            <p className="text-center text-sm text-gray-600 p-6">Loading map...</p>
                        )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        Pinned Location: <code>[{lat.toFixed(5)}, {lng.toFixed(5)}]</code>
                    </p>
                </div>
            </div>

            {/* PAYMENT METHODS */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Payment Method</h3>
                <div className="space-y-2">
                    <label className="flex items-center gap-2">
                        <input type="radio" name="payment" defaultChecked />
                        <span>MPesa (Paybill)</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="payment" />
                        <span>Credit / Debit Card (Coming Soon)</span>
                    </label>
                </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="space-y-4 border-t pt-6">
                <h3 className="text-xl font-semibold">Order Summary</h3>
                <ul className="space-y-2 text-gray-700">
                    <li className="flex justify-between">
                        <span>Subtotal</span>
                        <span>Ksh {total.toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Distance</span>
                        <span>{distance.toFixed(2)} km</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Delivery Fee (Distance * 100)</span>
                        <span>Ksh {Math.round(deliveryFee).toLocaleString()}</span>
                    </li>
                    <li className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>Ksh {totalWithDelivery.toLocaleString()}</span>
                    </li>
                </ul>
            </div>

            {/* PAY AND PLACE ORDER */}
            <div className="flex justify-end items-center space-x-4">
                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}
                <Button className="btn" onClick={handleSubmit}>
                    Pay & Place Order
                </Button>
            </div>

        </div>
    )
}

export default Checkout
