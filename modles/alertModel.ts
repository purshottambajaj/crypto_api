import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cryptoId: { type: String, required: true },
  targetPrice: { type: Number, required: true },
  vsCurrency: { type: String, required: true },
  alertSent: { type: Boolean, default: false },
});

const Alert = mongoose.model('Alert', alertSchema);
export default Alert;
