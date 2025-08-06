import { Package, ShoppingCart, Truck, BarChart, AlertTriangle, Star } from 'lucide-react'
import React from 'react'

const metrics = [
    {
        label: 'Total Sales (This Month)',
        value: 'KES 152,430',
        icon: <BarChart className="text-primary" size={20} />,
    },
    {
        label: 'Orders',
        value: '432',
        icon: <ShoppingCart className="text-primary" size={20} />,
    },
    {
        label: 'Pending Deliveries',
        value: '38',
        icon: <Truck className="text-primary" size={20} />,
    },
    {
        label: 'Total Products',
        value: '97',
        icon: <Package className="text-primary" size={20} />,
    },
    {
        label: 'Low Stock Alerts',
        value: '5',
        icon: <AlertTriangle className="text-yellow-500" size={20} />,
    },
    {
        label: 'Store Rating',
        value: '4.3 / 5',
        icon: <Star className="text-yellow-400" size={20} />,
    },
]

const MetricsGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric, idx) => (
                <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition"
                >
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-500">{metric.label}</span>
                        <span className="text-lg font-semibold">{metric.value}</span>
                    </div>
                    <div className="p-2 rounded-full bg-gray-100">{metric.icon}</div>
                </div>
            ))}
        </div>
    )
}

export default MetricsGrid
