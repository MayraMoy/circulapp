// backend/src/controllers/userController.js
const User = require('../models/User');
const Rating = require('../models/Rating');

// Obtener perfil público de un usuario (con calificaciones promedio)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado.' });

    // Calcular promedios de calificaciones recibidas
    const ratings = await Rating.find({ ratedId: user._id });
    const avgQuality = ratings.length
      ? (ratings.reduce((sum, r) => sum + r.materialQuality, 0) / ratings.length).toFixed(1)
      : null;
    const avgPunctuality = ratings.length && ratings.some(r => r.punctuality !== undefined)
      ? (ratings.reduce((sum, r) => sum + (r.punctuality || 0), 0) / ratings.length).toFixed(1)
      : null;

    res.json({
      ...user.toObject(),
      ratings: {
        count: ratings.length,
        materialQuality: avgQuality,
        punctuality: avgPunctuality
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener perfil.' });
  }
};

module.exports = { getUserProfile };