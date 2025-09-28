// backend/src/models/Rating.js
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  raterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ratedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  materialQuality: { // calidad del material donado
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  punctuality: { // puntualidad en entrega/recolección
    type: Number,
    min: 1,
    max: 5
  },
  standardCompliance: { // cumplimiento de estándares de procesamiento
    type: Number,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 500
  }
}, { timestamps: true });

// Índice para evitar calificaciones duplicadas
ratingSchema.index({ itemId: 1, raterId: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);