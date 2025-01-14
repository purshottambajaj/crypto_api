import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import alertRoutes from './routes/alertRoutes';  // Import your route file
import { checkAlerts } from './services/alertService';  // Import your alert service
import * as cron from 'node-cron';  // Import cron job scheduler

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use the alert routes
app.use('/api', alertRoutes);  

// Set up a cron job to check alerts every minute
cron.schedule('* * * * *', async () => {
  console.log('Checking alerts...');
  await checkAlerts();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
