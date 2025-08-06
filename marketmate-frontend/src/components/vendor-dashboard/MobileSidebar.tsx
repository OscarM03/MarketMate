import React, { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import type { NavLink } from './DashboardLayout'

const MobileSidebar = ({ navLinks }: { navLinks: NavLink[] }) => {
    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Menu className="text-primary" size={28} />
            </SheetTrigger>

            <SheetContent className="bg-white w-[75%] p-4" side="left">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold text-primary">MarketMate</SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-1 px-4 mt-4">
                    {navLinks.map(({ to, label, icon }) => (
                        <Link
                            key={to}
                            to={to}
                            onClick={() => setOpen(false)}
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
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar
