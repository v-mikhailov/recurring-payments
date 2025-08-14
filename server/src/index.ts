import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';
import { logger } from './utils/logger';

dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI environment variable is required');
  process.exit(1);
}


mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err) => {
    logger.error('Failed to connect to MongoDB:', err);
  })
 
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
})