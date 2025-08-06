// components/dashboard/DashboardLayout.jsx
import React, { type ReactElement } from 'react';
import { Link, Outlet, useLocation } from 'react-router'
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Wallet,
    Star,
    Settings
} from 'lucide-react';
import MobileSidebar from './MobileSidebar';

export type NavLink = {
    to: string;
    label: string;
    icon: ReactElement;
};

const navLinks: NavLink[] = [
    { to: '/dashboard/vendor', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { to: '/dashboard/vendor/products', label: 'Products', icon: <Package size={18} /> },
    { to: '/dashboard/vendor/orders', label: 'Orders', icon: <ShoppingCart size={18} /> },
    { to: '/dashboard/vendor/payouts', label: 'Payouts', icon: <Wallet size={18} /> },
    { to: '/dashboard/vendor/reviews', label: 'Reviews', icon: <Star size={18} /> },
    { to: '/dashboard/vendor/settings', label: 'Store Settings', icon: <Settings size={18} /> },
];

const DashboardLayout = () => {
    const { pathname } = useLocation();

    return (
        <div>
            {/* Mobile Sidebar Trigger */}
            <div className="md:hidden container py-2 bg-muted border-b border-gray-200">
                <div className='screen-w flex items-center justify-between'>
                    <Link to="/dashboard">
                        <h1 className="text-xl font-bold text-primary">MarketMate</h1>
                    </Link>
                    <MobileSidebar navLinks={navLinks} />
                </div>
            </div>
            <div className="flex h-screen bg-muted">
                {/* Desktop Sidebar */}
                <aside className="hidden md:flex flex-col w-[270px] bg-white">
                    <div className="mt-6 px-6">
                        <Link to="/dashboard">
                            <h1 className="text-xl font-bold text-primary">MarketMate</h1>
                        </Link>
                    </div>
                    <nav className="flex flex-col gap-1 px-4 mt-4">
                        {navLinks.map(({ to, label, icon }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`flex items-center gap-3 text-sm px-3 py-3 rounded-md hover:bg-muted transition ${pathname === to
                                    ? 'bg-muted text-primary font-semibold'
                                    : 'font-medium'
                                    }`}
                            >
                                {icon}
                                {label}
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto remove-scrollbar container">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

