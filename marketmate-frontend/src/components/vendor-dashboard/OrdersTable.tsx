// components/OrdersTable.tsx
import React, { useMemo, useState } from 'react';
import { Check, X } from 'lucide-react';
import { assets } from '@/assets';

const sampleOrders = [
    {
        id: 'ORD12345',
        productName: 'Fresh Tomatoes',
        productImage: assets.image2,
        productBrand: 'FarmFresh',
        paid: false,
        quantity: 4,
        date: '2025-07-25',
        total: 'KES 1,200',
        pickupCode: 'PK1200',
        picked_up: false,
        in_transit: false,
        delivered: false,
    },
    {
        id: 'ORD67890',
        productName: 'Maize Flour',
        productImage: assets.image3,
        productBrand: 'GrainMasters',
        paid: true,
        quantity: 5,
        date: '2025-07-20',
        total: 'KES 800',
        pickupCode: 'PK0890',
        picked_up: true,
        in_transit: true,
        delivered: false,
    },
    {
        id: 'ORD54321',
        productName: 'Pain Reliever Tablets',
        productImage: assets.image4,
        productBrand: 'QuickMed',
        paid: true,
        quantity: 3,
        date: '2025-07-18',
        total: 'KES 600',
        pickupCode: 'PK0600',
        picked_up: true,
        in_transit: true,
        delivered: true,
    },
    {
        id: 'ORD98765',
        productName: 'Bottled Drinking Water - 1L',
        productImage: assets.image5,
        productBrand: 'AquaLife',
        paid: true,
        quantity: 5,
        date: '2025-07-15',
        total: 'KES 400',
        pickupCode: 'PK0400',
        picked_up: true,
        in_transit: true,
        delivered: true,
    },
    {
        id: 'ORD11223',
        productName: 'Antiseptic Liquid - 500ml',
        productImage: assets.image1,
        productBrand: 'SafeClean',
        paid: true,
        quantity: 4,
        date: '2025-07-10',
        total: 'KES 300',
        pickupCode: 'PK0300',
        picked_up: true,
        in_transit: true,
        delivered: true,
    },
    {
        id: 'ORD44556',
        productName: 'Organic Honey - 500g',
        productImage: assets.image2,
        productBrand: 'NatureSweet',
        paid: true,
        quantity: 5,
        date: '2025-07-05',
        total: 'KES 900',
        pickupCode: 'PK0900',
        picked_up: true,
        in_transit: true,
        delivered: true,
    },
    {
        id: 'ORD77889',
        productName: 'Herbal Tea - 100g',
        productImage: assets.image3,
        productBrand: 'TeaTime',
        paid: true,
        quantity: 4,
        date: '2025-07-01',
        total: 'KES 500',
        pickupCode: 'PK0500',
        picked_up: true,
        in_transit: true,
        delivered: true,
    },
];

const StatusIcon = ({ status }: { status: boolean }) =>
    status ? (
        <Check className="text-white p-1 h-6 w-6 bg-green-600 rounded-md" strokeWidth={4} />
    ) : (
        <X className="text-white p-1 h-6 w-6 bg-red-600 rounded-md" strokeWidth={4} />
    );

const OrdersTable = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [sortAttribute, setSortAttribute] = useState<'productName' | 'productBrand' | 'pickupCode'>('productName')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    const filteredOrders = useMemo(() => {
        let orderList = sampleOrders;

        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            orderList = orderList.filter(order =>
                order.productName.toLowerCase().includes(lowerCaseQuery) ||
                order.productBrand.toLowerCase().includes(lowerCaseQuery) ||
                order.pickupCode.toLowerCase().includes(lowerCaseQuery)
            )
        }
        orderList = [...orderList].sort((productA, productB) => {
            let valueA: string | number = productA[sortAttribute]
            let valueB: string | number = productB[sortAttribute]

            if (sortAttribute === 'productName' || sortAttribute === 'productBrand') {
                valueA = typeof valueA === 'string' ? valueA.toLowerCase() : valueA
                valueB = typeof valueB === 'string' ? valueB.toLowerCase() : valueB
            }

            if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1
            if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1
            return 0
        })

        return orderList
    }, [searchQuery, sortAttribute, sortDirection]);

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
        <div className="screen-w !w-[95%] overflow-hidden mt-6">
            <h1 className="text-2xl font-semibold">Manage Your Orders</h1>

            <div className="overflow-x-auto mt-6 border bg-white rounded-lg shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b">
                    <div className="flex gap-2 flex-wrap">
                        <input
                            placeholder="Search name/category/brand"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-3 py-2 border rounded-md w-full sm:w-64"
                        />
                    </div>

                    <div className="flex gap-3">
                        <div className="flex items-center gap-1 text-sm">
                            Sort by:
                            {(['productName', 'productBrand'] as const).map((key) => (
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
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-gray-700 font-semibold">
                        <tr>
                            <th className="p-3">Product</th>
                            <th className="p-3">Order ID</th>
                            <th className="p-3">Pickup Code</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Paid</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Picked Up</th>
                            <th className="p-3">In Transit</th>
                            <th className="p-3">Delivered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <img
                                        src={order.productImage}
                                        alt={order.productName}
                                        className="w-12 h-12 rounded object-cover flex-shrink-0"
                                    />
                                    <div className="flex flex-col">
                                        <div className="font-medium">{order.productName}</div>
                                        <div className="text-xs text-gray-500">{order.productBrand}</div>
                                    </div>
                                </td>
                                <td className="p-3">{order.id}</td>
                                <td className="p-3 font-semibold">{order.pickupCode}</td>
                                <td className="p-3">{order.quantity}</td>
                                <td className="p-3">{order.total}</td>
                                <td className="p-3">
                                    <StatusIcon status={order.paid} />
                                </td>
                                <td className="p-3">{order.date}</td>
                                <td className="p-3">
                                    <StatusIcon status={order.picked_up} />
                                </td>
                                <td className="p-3">
                                    <StatusIcon status={order.in_transit} />
                                </td>
                                <td className="p-3">
                                    <StatusIcon status={order.delivered} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersTable;
