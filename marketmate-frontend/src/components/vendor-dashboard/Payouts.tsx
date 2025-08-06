import React from 'react';
import MetricCard from './MetricCard';
import { Check, LayoutDashboard, Wallet, X } from 'lucide-react';
import { assets } from '@/assets';

const payouts = [
    {
        id: 'p1',
        image: assets.image1,
        name: 'Fresh Tomatoes',
        paid: false,
        quantity: 5,
        unitPrice: 30,
        dateSold: '2025-08-03',
    },
    {
        id: 'p2',
        image: assets.image2,
        name: 'Green Bananas',
        paid: true,
        quantity: 12,
        unitPrice: 15,
        dateSold: '2025-08-02',
    },
    {
        id: 'p3',
        image: assets.image3,
        name: 'Aspirin 100mg',
        paid: true,
        quantity: 2,
        unitPrice: 120,
        dateSold: '2025-08-01',
    },
    {
        id: 'p4',
        image: assets.image4,
        name: 'Maize Flour 2Kg',
        paid: true,
        quantity: 3,
        unitPrice: 80,
        dateSold: '2025-07-30',
    },
    {
        id: 'p5',
        image: assets.image5,
        name: 'Bottled Water 1L',
        paid: false,
        quantity: 10,
        unitPrice: 20,
        dateSold: '2025-07-29',
    },
];

const metrics = {
    totalEarned: 120000, // Example total earned
    totalSalesMonth: 150000, // Example total sales for the month
    totalSalesLastMonth: 120000, // Example total sales for the last month
    orders: 120, // Example number of orders
};

const StatusIcon = ({ status }: { status: boolean }) =>
    status ? (
        <Check className="text-white p-1 h-6 w-6 bg-green-600 rounded-md" strokeWidth={4} />
    ) : (
        <X className="text-white p-1 h-6 w-6 bg-red-600 rounded-md" strokeWidth={4} />
    );

const Payouts = () => {
    const total = payouts.reduce((sum, item) => item.paid ? sum + item.quantity * item.unitPrice : sum, 0);

    const calcChangePercent = (current: number, previous: number) => {
        if (previous === 0) return null;
        const change = ((current - previous) / previous) * 100;
        const isProfit = change >= 0;
        return {
            text: `${isProfit ? "▲" : "▼"} ${Math.abs(change).toFixed(1)}% ${isProfit ? "increase" : "decrease"
                }`,
            color: isProfit ? "text-green-600" : "text-red-600",
        };
    };

    const change = calcChangePercent(metrics.totalSalesMonth, metrics.totalSalesLastMonth);

    return (
        <div className="screen-w !w-[95%] overflow-hidden mt-6">
            <div className="flex lg:w-[60%] xl:w-[50%] gap-4">
                <MetricCard
                    title="Total Sales (Month)"
                    icon={<LayoutDashboard size={20} />}
                    value={`KES ${(metrics.totalSalesMonth / 100).toLocaleString()}`}
                    extra={<span className={change?.color}>{change?.text}</span>}
                    bgColor="bg-[#fff5f7]"
                    iconColor="text-[#ff637e]"
                />

                <MetricCard
                    title="Total Earned"
                    icon={<Wallet size={20} />}
                    value={`KES ${(total).toLocaleString()}`}
                    bgColor="bg-[#f0fdf4]"
                    iconColor="text-[#22c55e]"
                />
            </div>
            <h2 className="text-2xl font-semibold mt-6">Payout Summary</h2>

            <div className="overflow-x-auto mt-6 border bg-white rounded-lg shadow-sm">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4">Product</th>
                            <th className="py-2 px-4">Quantity</th>
                            <th className="py-2 px-4">Unit Price</th>
                            <th className="py-2 px-4">Sold On</th>
                            <th className="py-2 px-4">Amount</th>
                            <th className="py-2 px-4">Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payouts.map((item) => (
                            <tr key={item.id} className="border-t">
                                <td className="py-3 px-4 flex items-center gap-3">
                                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                                    <span className="min-w-[150px]">{item.name}</span>
                                </td>
                                <td className="py-3 px-4">{item.quantity}</td>
                                <td className="py-3 px-4">KES {item.unitPrice.toFixed(2)}</td>
                                <td className="py-3 px-4 min-w-[150px]">{item.dateSold}</td>
                                <td className="py-3 px-4 font-medium text-green-600">
                                    KES {(item.quantity * item.unitPrice).toFixed(2)}
                                </td>
                                <td className="py-3 px-4">
                                    <StatusIcon status={item.paid} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payouts;
