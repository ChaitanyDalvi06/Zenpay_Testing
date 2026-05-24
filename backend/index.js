import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import paymentRoutes from './routes/payment.js';
import razorpayRoutes from './routes/razorpayRoutes.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import { paymentTypeDefs } from './graphQL/typedefs.js';
import { resolvers } from './graphQL/resolvers.js';

dotenv.config();


async function startServer() {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs: paymentTypeDefs,
        resolvers: resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();

    app.use(express.json());
    app.use(cors());

    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Slice';

    mongoose.connect(mongoUri)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.error('MongoDB connection error:', err));

    app.use('/api/auth', authRoutes);
    app.use('/api', profileRoutes);
    app.use('/api/payment', paymentRoutes);
    app.use('/api/razorpay', razorpayRoutes);

    app.use('/graphql', expressMiddleware(server));

    const PORT = 8000;
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`Server is running on port ${PORT}`);
}

startServer();
