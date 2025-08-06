// pages/dashboard/vendor/Overview.tsx
import { LayoutDashboard, Package, ShoppingCart, Truck, } from 'lucide-react'
import MetricCard from './MetricCard'
import BarSalesChart from './BarSalesChart';
import TopProducts from './TopProducts';

const Overview = () => {
    const metrics = {
        totalSalesLastMonth: 234500,
        totalSalesMonth: 1298500,
        orders: 340,
        pendingDeliveries: 48,
        totalProducts: 120,
        rating: 4.6
    }
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
        <div className='screen-w !w-[95%]'>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 md:mt-6">
                <MetricCard
                    title="Total Sales (Month)"
                    icon={<LayoutDashboard size={20} />}
                    value={`KES ${(metrics.totalSalesMonth / 100).toLocaleString()}`}
                    extra={<span className={change?.color}>{change?.text}</span>}
                    bgColor="bg-[#fff5f7]"
                    iconColor="text-[#ff637e]"
                />

                <MetricCard
                    title="Orders"
                    icon={<ShoppingCart size={20} />}
                    value={metrics.orders}
                    bgColor="bg-[#f3f8ff]"
                    iconColor="text-[#3b82f6]"
                />

                <MetricCard
                    title="Pending Deliveries"
                    icon={<Truck size={20} />}
                    value={metrics.pendingDeliveries}
                    bgColor="bg-[#fef9e7]"
                    iconColor="text-[#fbbf24]"
                />

                <MetricCard
                    title="Total Products"
                    icon={<Package size={20} />}
                    value={metrics.totalProducts}
                    bgColor="bg-[#f0fdf4]"
                    iconColor="text-[#22c55e]"
                />
            </div>
            <div className="grid md:grid-cols-[59%_39%] my-6 gap-[2%]">
                <div className="">
                    <BarSalesChart />
                </div>
                <div className="max-md:mt-14">
                    <TopProducts />
                </div>
            </div>
        </div>
    )
}

export default Overview
