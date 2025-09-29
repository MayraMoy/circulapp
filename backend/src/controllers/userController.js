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

// Actualizar perfil de usuario
const updateUserProfile = async (req, res) => {
  try {
    const { name, email, phone, location, bio } = req.body;
    const userId = req.user.id;

    // Solo validar email si se está actualizando y es diferente al actual
    if (email) {
      const currentUser = await User.findById(userId);
      if (email !== currentUser.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ msg: 'El email ya está en uso.' });
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, location, bio },
      { new: true, runValidators: true, select: '-password' }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error('Error en updateUserProfile:', err);
    res.status(500).json({ msg: 'Error al actualizar el perfil.' });
  }
};
// Exporta ambas funciones
module.exports = { getUserProfile, updateUserProfile };
