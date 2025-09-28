// frontend/src/pages/ItemDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import API from '../services/Api';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await API.get(`/items/${id}`);
        setItem(res.data);
      } catch (err) {
        setError('No se pudo cargar el material.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchItem();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-12 text-center">
          <p>Cargando...</p>
        </div>
      </Layout>
    );
  }

  if (error || !item) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-12 text-center">
          <p className="text-red-600">{error || 'Material no encontrado.'}</p>
          <button
            onClick={() => navigate('/search')}
            className="mt-4 text-blue-600 hover:underline"
          >
            ← Volver a la búsqueda
          </button>
        </div>
      </Layout>
    );
  }

  const categoryNames = {
    plastico: 'Plástico',
    papel: 'Papel y Cartón',
    vidrio: 'Vidrio',
    metal: 'Metal',
    textil: 'Textil',
    electronico: 'Electrónico',
    otro: 'Otro'
  };

  const processingStates = {
    sin_procesar: 'Sin procesar',
    en_proceso: 'En proceso',
    fardado: 'Fardado',
    validado: 'Validado'
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-gray-600 hover:text-gray-900 flex items-center"
        >
          ← Volver
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h1>
        <p className="text-gray-600 mb-6">{item.description || 'Sin descripción.'}</p>

        {/* Galería de imágenes */}
        {item.images && item.images.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Fotos del material</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {item.images.map((url, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-gray-100 rounded overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(url)}
                >
                  <img
                    src={url}
                    alt={`Foto ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Información detallada */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><span className="font-medium">Categoría:</span> {categoryNames[item.category] || item.category}</p>
              <p><span className="font-medium">Estado:</span> {processingStates[item.processingState] || item.processingState}</p>
              {item.ownerId && (
                <p><span className="font-medium">Ofertante:</span> {item.ownerId.name || 'Usuario'}</p>
              )}
            </div>
            <div>
              <p><span className="font-medium">Ubicación:</span></p>
              <p className="text-sm text-gray-600">
                {item.address || `${item.location.lat.toFixed(4)}, ${item.location.lng.toFixed(4)}`}
              </p>
              {/* Opcional: enlace a Google Maps */}
              <a
                href={`https://www.google.com/maps?q=${item.location.lat},${item.location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                Ver en Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* Modal de imagen ampliada (opcional) */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Ampliada"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}