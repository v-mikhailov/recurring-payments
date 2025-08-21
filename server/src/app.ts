import express from 'express';
import { authRouter } from './controllers/auth';
import { paymentRouter } from './controllers/payment';
const app = express();

app.use(express.json());

app.get('/api/v1/ping', (_req, res) => {
  res.json({message: 'Hey hey hye, sweetie!'});
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/payments', paymentRouter)

export default app;