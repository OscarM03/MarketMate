import { Link } from "react-router";
import type { Store } from "../Stores";


const StoreCard = ({ store } : { store: Store }) => {
    return (
        <Link
            to={`/stores/${store.id}`}
            className="rounded-xl shadow-md transition overflow-hidden group"
        >
            <img
                src={store.image}
                alt={store.name}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold text-gray-800">{store.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{store.slogan}</p>
                <p className="text-xs text-gray-400">{store.location}</p>
                <p className="text-xs text-primary font-medium">{store.productCount} products</p>
            </div>
        </Link>
    );
};

export default StoreCard;
