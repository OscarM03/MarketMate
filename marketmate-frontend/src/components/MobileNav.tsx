import React from 'react'
import {
    Sheet,
    // SheetClose,
    SheetContent,
    SheetDescription,
    // SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Link } from 'react-router'
import { Menu } from 'lucide-react'


const MobileNav = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Menu className='text-primary' size={24} strokeWidth={3} />
            </SheetTrigger>
            <SheetContent className='bg-white w-[70%]'>
                <SheetHeader className=''>
                    <SheetTitle className='text-3xl font-bold text-primary'>MarketMate</SheetTitle>
                    <SheetDescription className='text-xl font-medium text-gray-500'>
                        Discover fresh goods with instant delivery from the market — Effortlessly
                    </SheetDescription>
                </SheetHeader>
                <div className="p-4">
                    <nav className=''>
                        <ul className='flex gap-6 flex-col'>
                            <Link to="/stores">
                                <li className='font-medium hover:text-secondary'>Stores</li>
                            </Link>
                            <Link to="/experts">
                                <li className=' font-medium hover:text-secondary'>Experts</li>
                            </Link>
                            <Link to="/landmarks">
                                <li className=' font-medium hover:text-secondary'>Landmarks</li>
                            </Link>
                        </ul>
                    </nav>
                </div>
                {/* <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter> */}
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav
