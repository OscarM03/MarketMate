import { UserRound } from 'lucide-react'
import { Link } from 'react-router'
import MobileNav from './MobileNav'

const Navbar = () => {
    const user = false;
    // const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <section className=' bg-white shadow-sm'>
            <div className='container h-16'>
                <div className='screen-w flex justify-between items-center h-full'>
                    <div className='logo'>
                        <Link to="/">
                            <h1 className='text-2xl font-medium'>MarketMate</h1>
                        </Link>
                    </div>
                    <div className='lg:flex items-center gap-6 hidden'>
                        <nav className=''>
                            <ul className='flex gap-4'>
                                <Link to="/stores">
                                    <li className='text-secondary font-medium'>Stores</li>
                                </Link>
                                <Link to="/experts">
                                    <li className='text-secondary font-medium'>Products</li>
                                </Link>
                                <Link to="/landmarks">
                                    <li className='text-secondary font-medium'>Landmarks</li>
                                </Link>
                            </ul>
                        </nav>
                        {/* <form className="relative hidden lg:block" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                placeholder='Search....'
                                className="border-2 py-2 px-4 rounded-full w-[170px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                // onClick={() => setIsSearchOpen(true)}
                            />
                            <button>
                                <Search className='absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400' size={20} strokeWidth={3} />
                            </button>
                        </form> */}
                        {user ? (
                            <Link to="/profile">
                                <UserRound />
                            </Link>
                        ) : (
                            <div className='flex gap-4'>
                                <button className='btn'>Sign Up</button>
                                <button className='btn'>Login</button>
                            </div>
                        )}
                    </div>
                    <div className='lg:hidden flex items-center gap-4'>
                        {/* <button>
                            <Search className='  text-primary' size={20} strokeWidth={3} />
                        </button> */}
                        {user ? (
                            <Link to="/profile">
                                <UserRound />
                            </Link>
                        ) : (
                            <h2 className='text-secondary font-medium'>Login</h2>
                        )}
                        <MobileNav />
                    </div>
                </div>
            </div>
            {/* {isSearchOpen && (
                <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            )} */}
        </section>
    )
}

export default Navbar
