// backend/src/controllers/itemController.js
const Item = require('../models/Item');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;

// Crear un nuevo ítem (RF03)
const createItem = async (req, res) => {
  try {
    const { title, description, category, lat, lng } = req.body;

    // ✅ Convertir explícitamente a número
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    // ✅ Validar que sean números válidos
    if (isNaN(latNum) || isNaN(lngNum)) {
      return res.status(400).json({ msg: 'Latitud y longitud deben ser números válidos.' });
    }

    // Subir imágenes (si usas CloudinaryStorage)
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => file.path || file.url);
    }

    const newItem = new Item({
      title,
      description,
      category,
      location: { lat: latNum, lng: lngNum }, // ✅ números reales
      ownerId: req.user.id,
      images: imageUrls
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error('Error en createItem:', err);
    res.status(500).json({ msg: 'Error al crear el ítem.' });
  }
};

// Buscar ítems con filtros (RF04 + RF13)
const searchItems = async (req, res) => {
  try {
    const { query, category, processingState, lat, lng, radius, ownerId } = req.query;

    let filter = {};

    if (ownerId) {
      filter.ownerId = ownerId;
    }

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ];
    }

    if (category) filter.category = category;
    if (processingState) filter.processingState = processingState;

    let items = await Item.find(filter).populate('ownerId', 'name email');

    if (lat && lng && radius) {
      const earthRadiusKm = 6371;
      const maxDistance = parseFloat(radius); // en km

      items = items.filter(item => {
        const dx = (item.location.lat - lat) * earthRadiusKm * Math.PI / 180;
        const dy = (item.location.lng - lng) * earthRadiusKm * Math.PI / 180 * Math.cos(lat * Math.PI / 180);
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= maxDistance;
      });
    }

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al buscar ítems.' });
  }
};

// Obtener un ítem por ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('ownerId', 'name');
    if (!item) return res.status(404).json({ msg: 'Ítem no encontrado.' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener el ítem.' });
  }
};

// Eliminar un ítem (solo el dueño o admin)
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Ítem no encontrado.' });

    // Solo el dueño o admin puede eliminar
    if (item.ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'No tienes permiso para eliminar este ítem.' });
    }

    await Item.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Publicación eliminada.' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar el ítem.' });
  }
};

module.exports = { createItem, searchItems, getItemById, deleteItem };