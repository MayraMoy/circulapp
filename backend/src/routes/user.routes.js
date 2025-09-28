// backend/src/routes/user.routes.js
const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

/**
 * @route   GET /api/users/:id
 * @desc    Obtener perfil público de un usuario (con calificaciones promedio)
 * @access  Privado
 */
router.get('/:id', auth, getUserProfile);

// Puedes agregar más rutas aquí en el futuro:
// - Calificar a otro usuario (POST /api/users/:id/rate)
// - Obtener historial de donaciones
// - Editar perfil, etc.

module.exports = router;