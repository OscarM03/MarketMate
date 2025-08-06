import {
    Facebook,
    Twitter,
    Instagram,
    Mail,
    Phone,
    MapPin,
    Send,
} from "lucide-react";

const Footer = () => {
    return (
        <section className="bg-gray-100">
            <footer className="container text-gray-700 pt-12 pb-6  mt-6">
                <div className="screen-w grid gap-10 md:grid-cols-4 sm:grid-cols-2 grid-cols-1">

                    <div>
                        <h2 className="text-xl font-bold text-primary mb-3">MarketMate</h2>
                        <p className="text-sm leading-relaxed">
                            Your trusted local marketplace for essential goods, powered by smart technology.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <a href="#" aria-label="Facebook" className="hover:text-primary">
                                <Facebook size={18} />
                            </a>
                            <a href="#" aria-label="Twitter" className="hover:text-primary">
                                <Twitter size={18} />
                            </a>
                            <a href="#" aria-label="Instagram" className="hover:text-primary">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-gray-800">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary">Home</a></li>
                            <li><a href="#" className="hover:text-primary">Shop</a></li>
                            <li><a href="#" className="hover:text-primary">Vendors</a></li>
                            <li><a href="#" className="hover:text-primary">Cart</a></li>
                            <li><a href="#" className="hover:text-primary">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-gray-800">Customer Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-primary">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary">FAQs</a></li>
                            <li><a href="#" className="hover:text-primary">Returns</a></li>
                            <li><a href="#" className="hover:text-primary">Track Order</a></li>
                            <li><a href="#" className="hover:text-primary">Report an Issue</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-gray-800">Get in Touch</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <Phone size={16} className="text-primary" />
                                <span>+254 712 345 678</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} className="text-primary" />
                                <span>support@marketmate.africa</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin size={16} className="text-primary" />
                                <span>Nairobi, Kenya</span>
                            </li>
                        </ul>

                        <div className="mt-5">
                            <label htmlFor="feedback" className="block text-sm font-medium mb-2">
                                Send Feedback
                            </label>
                            <div className="flex items-center rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-primary">
                                <input
                                    type="email"
                                    id="feedback"
                                    placeholder="Feel free to send us your feedback...."
                                    className="w-full px-3 py-2 text-sm focus:outline-none"
                                />
                                <button className="bg-primary text-white px-3 py-2 hover:bg-primary/90 transition">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} MarketMate. All rights reserved.
                </div>
            </footer>
        </section>
    );
};

export default Footer;
