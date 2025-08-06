import { Search, X, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';


const SearchBar = ({ query }: { query?: string }) => {
    const [searchQuery, setSearchQuery] = useState(query || '');
    const [searchType, setSearchType] = useState<'products' | 'stores'>('products');
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedQuery = (searchQuery ?? '').trim();
        if (!trimmedQuery) return;

        if (searchType === 'products') {
            navigate(`/products?query=${encodeURIComponent(trimmedQuery)}&type=${searchType}`);
        } else {
            navigate(`/stores?query=${encodeURIComponent(trimmedQuery)}&type=${searchType}`);
        }
    };

    const handleClearSearch = () => {
        if (!searchQuery) return;
        if (location.pathname.includes('/products') || location.pathname.includes('/stores')) {
            navigate(location.pathname.split('?')[0]);
        }
        setSearchQuery('');
    };

    const toggleDropdown = () => setShowDropdown(prev => !prev);
    const selectType = (type: 'products' | 'stores') => {
        setSearchType(type);
        setShowDropdown(false);
    };

    return (
        <form className="screen-w flex justify-center mt-6" onSubmit={handleSubmit}>
            <div className='w-[90%] md:w-[70%] lg:w-[60%] relative'>
                {/* Dropdown Button */}
                <div className="absolute right-14 top-1/2 transform -translate-y-1/2 z-10">
                    <button
                        type="button"
                        onClick={toggleDropdown}
                        className="flex items-center gap-1 px-3 py-2 bg-primary text-white rounded-full text-sm hover:opacity-90 transition"
                    >
                        {searchType === 'products' ? 'Products' : 'Stores'}
                        <ChevronDown className="w-4 h-4" />
                    </button>

                    {showDropdown && (
                        <div className="absolute top-full left-0 mt-2 bg-white shadow-md border rounded-md overflow-hidden z-50 w-32">
                            <div
                                onClick={() => selectType('products')}
                                className="px-3 py-2 text-sm hover:bg-primary hover:text-white cursor-pointer"
                            >
                                Products
                            </div>
                            <div
                                onClick={() => selectType('stores')}
                                className="px-3 py-2 text-sm hover:bg-primary hover:text-white cursor-pointer"
                            >
                                Stores
                            </div>
                        </div>
                    )}
                </div>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder={`Search ${searchType} ...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-3 py-4 px-4 rounded-full w-full border-primary focus:outline-none"
                />

                {/* Search/Clear Button */}
                <button
                    type='button'
                    onClick={handleClearSearch}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full transition-all duration-200 hover:scale-105"
                >
                    {searchQuery ? (
                        <X size={18} strokeWidth={3} />
                    ) : (
                        <Search size={18} strokeWidth={3} />
                    )}
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
