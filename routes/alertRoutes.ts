import express from 'express';
import Alert from '../modles/alertModel';
import { getCryptoPrice } from '../services/priceService';  // Imports 

const router = express.Router();// Create an instance of the express router


// Route to fetch cryptocurrency price
router.get('/price/:cryptoId/:vsCurrency', async (req, res) => {
  const { cryptoId, vsCurrency } = req.params;
  try {
    // Call the service function to get the current price of the cryptocurrency
    const price = await getCryptoPrice(cryptoId, vsCurrency);
    if (price !== null) {
      res.json({ cryptoId, vsCurrency, price });
    } else {
      res.status(500).json({ error: 'Error fetching price' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching price' });
  }
});

// Route to create a new alert for a specific cryptocurrency price
router.post('/alert', async (req, res) => {
  const { userId, cryptoId, targetPrice, vsCurrency } = req.body;
  
  // Check  all the required fields are provided; if not, send a bad Missing
  if (!userId || !cryptoId || !targetPrice || !vsCurrency) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    const newAlert = new Alert({ userId, cryptoId, targetPrice, vsCurrency });
    await newAlert.save();
    res.status(201).json({ message: 'Alert created successfully', alert: newAlert });
  } catch (error) {
    res.status(500).json({ error: 'Error creating alert' });
  }
});



// Route to fetch all alerts in the database
router.get('/alerts', async (req, res) => {
  try {
        // Retrieve all alerts from the database
    const alerts = await Alert.find();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching alerts' });
  }
});

export default router;