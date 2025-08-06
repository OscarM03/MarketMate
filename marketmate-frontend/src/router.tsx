import { createBrowserRouter } from "react-router";
import HomeLayout from "./components/layouts/HomeLayout";
import HomePage from "./components/pages/HomePage";
import AllProducts from "./components/AllProducts";
import Stores from "./components/Stores";
import ProductDetails from "./components/ProductDetails";
import StoreDetails from "./components/StoreDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Profile from "./components/Profile";
import DashboardLayout from "./components/vendor-dashboard/DashboardLayout";
import Overview from "./components/vendor-dashboard/Overview";
import VendorProducts from "./components/vendor-dashboard/VendorProducts";
import OrdersTable from "./components/vendor-dashboard/OrdersTable";
import Payouts from "./components/vendor-dashboard/Payouts";
import VendorReviews from "./components/vendor-dashboard/VendorReviews";
import StoreSettings from "./components/vendor-dashboard/StoreSettings";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "products", element: <AllProducts /> },
            { path: "stores", element: <Stores /> },
            { path: "cart", element: <Cart /> },
            { path: "profile", element: <Profile /> },
            { path: "cart/checkout", element: <Checkout /> },
            { path: "stores/:id", element: <StoreDetails /> },
            { path: "products/:id", element: <ProductDetails /> },
        ]
    },
    {
        path: "/dashboard/vendor/",
        element: <DashboardLayout />,
        children: [
            { index: true, element: <Overview /> },
            { path: "products", element: <VendorProducts /> },
            { path: "orders", element: <OrdersTable /> },
            { path: "payouts", element: <Payouts /> },
            { path: "reviews", element: <VendorReviews /> },
            { path: "settings", element: <StoreSettings /> },
            // Add more vendor dashboard routes here
        ]
    }
])