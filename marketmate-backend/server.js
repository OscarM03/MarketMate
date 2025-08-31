import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import authRoutes from './routes/auth-routes.js';
import storeRoutes from './routes/store-routes.js';
import reviewRoutes from './routes/review-routes.js';
import productRoutes from './routes/product-routes.js';
import cartRoutes from './routes/cart-routes.js';

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend URL
    credentials: true,
}));

// middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// database connection
connectDB();

// routes
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});