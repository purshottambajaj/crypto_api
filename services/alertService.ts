import Alert from '../modles/alertModel';
import { getCryptoPrice } from './priceService';  // Import all necessary files


// Function to check if any alerts need to be triggered
export const checkAlerts = async () => {
  try {
       // Retrieve all alerts where 'alertSent' is false
    const alerts = await Alert.find({ alertSent: false });

    for (const alert of alerts) {
      const price = await getCryptoPrice(alert.cryptoId, alert.vsCurrency);

       // If the price is successfully fetched and meets or exceeds the target price
      if (price !== null && price >= alert.targetPrice) {
        console.log(`Alert triggered: User ${alert.userId} - ${alert.cryptoId} has reached ${price}`);
        
        // Set the 'alertSent' flag to true to mark this alert as triggered and Save the update 
        alert.alertSent = true;
        await alert.save();
      }
    }
  } catch (error) {
    console.error('Error checking alerts:', error);
  }
};
