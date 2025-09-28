// backend/src/controllers/validationController.js
const Item = require('../models/Item');

// Validar un material fardado (solo gestores)
const validateMaterial = async (req, res) => {
  try {
    const { itemId, checklist, observations } = req.body;

    // Verificar que el usuario sea gestor
    if (req.user.role !== 'gestor') {
      return res.status(403).json({ msg: 'Solo los gestores pueden validar materiales.' });
    }

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ msg: 'Ítem no encontrado.' });

    // Aquí podrías validar que el ítem esté en estado "fardado"
    if (item.processingState !== 'fardado') {
      return res.status(400).json({ msg: 'El ítem debe estar en estado "fardado" para validarlo.' });
    }

    // Actualizar estado a "validado"
    item.processingState = 'validado';
    item.validatedBy = req.user.id;
    item.validationChecklist = checklist; // array de strings o booleanos
    item.validationObservations = observations;
    await item.save();

    res.json({ msg: 'Material validado exitosamente.', item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al validar el material.' });
  }
};

module.exports = { validateMaterial };