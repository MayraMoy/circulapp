const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: {
    type: String,
    enum: ['plastico', 'papel', 'vidrio', 'metal', 'textil', 'electronico', 'otro'],
    required: true
  },
  processingState: {
    type: String,
    enum: ['sin_procesar', 'en_proceso', 'fardado', 'validado'],
    default: 'sin_procesar'
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  images: [String], // URLs de Cloudinary
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);