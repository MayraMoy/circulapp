import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import API from '../services/Api';

export default function PublishItem() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'plastico',
    address: '',
    lat: null,
    lng: null
  });
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [error, setError] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);

  const categories = [
    { id: 'plastico', name: 'Plástico' },
    { id: 'papel', name: 'Papel y Cartón' },
    { id: 'vidrio', name: 'Vidrio' },
    { id: 'metal', name: 'Metal' },
    { id: 'textil', name: 'Textil' },
    { id: 'electronico', name: 'Electrónico' },
    { id: 'otro', name: 'Otro' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError('');
  };

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon), formattedAddress: display_name };
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=es`
      );
      const data = await response.json();
      if (data.display_name) {
        return { lat: parseFloat(lat), lng: parseFloat(lng), formattedAddress: data.display_name };
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  const handleAddressChange = async (e) => {
    const address = e.target.value;
    setFormData(prev => ({ ...prev, address }));
    if (address.trim().length > 5) {
      setIsGeocoding(true);
      setError('');
      const result = await geocodeAddress(address);
      if (result) {
        setFormData(prev => ({
          ...prev,
          lat: result.lat,
          lng: result.lng,
          address: result.formattedAddress
        }));
      } else {
        setError('No se encontró la dirección.');
        setFormData(prev => ({ ...prev, lat: null, lng: null }));
      }
      setIsGeocoding(false);
    } else {
      setFormData(prev => ({ ...prev, lat: null, lng: null }));
    }
  };

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setError('Tu navegador no soporta geolocalización.');
      return;
    }
    setError('');
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });
      const { latitude, longitude } = position.coords;
      const result = await reverseGeocode(latitude, longitude);
      if (result) {
        setFormData({
          ...formData,
          lat: result.lat,
          lng: result.lng,
          address: result.formattedAddress
        });
      } else {
        setFormData(prev => ({
          ...prev,
          lat: latitude,
          lng: longitude,
          address: `Ubicación GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
        }));
      }
    } catch (err) {
      if (err.code === 1) {
        setError('Permiso de ubicación denegado.');
      } else {
        setError('No se pudo obtener tu ubicación.');
      }
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    if (files.length + images.length > 5) {
      alert('Máximo 5 imágenes permitidas.');
      return;
    }
    setImages(prev => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return setError('El título es obligatorio.');
    if (!formData.lat || !formData.lng) return setError('Debes ingresar una dirección válida.');

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('lat', formData.lat);
    formDataToSend.append('lng', formData.lng);
    images.forEach(file => formDataToSend.append('images', file));

    try {
      await API.post('/items', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Error al publicar: ' + (err.response?.data?.msg || 'Inténtalo más tarde.'));
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Publicar Material Donable</h2>
        {error && <div className="bg-error-light text-error p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-background-paper p-6 rounded-lg shadow">
          {/* ... campos iguales, pero con clases de color */}
          <div className="mb-4">
            <label className="block text-text-primary mb-2">Título del material</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="Ej: Botellas PET limpias"
              required
            />
        </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Descripción</label>
            <textarea
              name="description"
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Categoría</label>
            <select
              name="category"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Campo de dirección */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Dirección exacta</label>
            <input
              type="text"
              placeholder="Ej: Av. Rivadavia 1234, Buenos Aires"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={formData.address}
              onChange={handleAddressChange}
            />
            {isGeocoding && <p className="text-sm text-blue-600 mt-1">Buscando ubicación...</p>}
            {formData.lat && (
              <p className="text-sm text-gray-600 mt-1">
                📍 Ubicación detectada: {formData.lat.toFixed(4)}, {formData.lng.toFixed(4)}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={getLocation}
            className="mb-6 text-sm text-blue-600 hover:underline flex items-center"
          >
            📍 Usar mi ubicación actual
          </button>

          {/* Selector de imágenes */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Fotos del material (máx. 5)</label>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
            {previewUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="relative">
                    <img src={url} alt={`preview ${idx}`} className="w-20 h-20 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-medium transition"
          >
            Publicar Material
          </button>
        </form>
      </div>
    </Layout>
  );
}