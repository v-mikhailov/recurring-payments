import express from 'express';
import cors from 'cors';
import { authRouter } from './controllers/auth';
import { paymentRouter } from './controllers/payment';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/payments', paymentRouter)

export default app;