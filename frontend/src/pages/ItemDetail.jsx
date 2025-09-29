// frontend/src/pages/ItemDetail.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import API from '../services/Api';
import { AuthContext } from '../contexts/AuthContext';

const cleanPhone = (phone) => {
  return phone.replace(/\D/g, '');
};

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
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
          <p className="text-error">{error || 'Material no encontrado.'}</p>
          <button
            onClick={() => navigate('/search')}
            className="mt-4 text-primary hover:underline"
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

  // ✅ Solo mostrar botones si el usuario está autenticado
  const isOwner = user && item.ownerId?._id === user.id;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-text-secondary hover:text-text-primary flex items-center"
        >
          ← Volver
        </button>

        <h1 className="text-2xl font-bold text-text-primary mb-2">{item.title}</h1>
        <p className="text-text-secondary mb-6">{item.description || 'Sin descripción.'}</p>

        {/* Galería de imágenes */}
        {item.images && item.images.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-text-primary mb-2">Fotos del material</h2>
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
        <div className="bg-background-paper p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><span className="font-medium text-text-primary">Categoría:</span> {categoryNames[item.category] || item.category}</p>
              <p><span className="font-medium text-text-primary">Estado:</span> {processingStates[item.processingState] || item.processingState}</p>
              {item.ownerId && (
                <p><span className="font-medium text-text-primary">Ofertante:</span> {item.ownerId.name || 'Usuario'}</p>
              )}
            </div>
            <div>
              <p><span className="font-medium text-text-primary">Ubicación:</span></p>
              <p className="text-sm text-text-secondary">
                {item.address || `${item.location.lat.toFixed(4)}, ${item.location.lng.toFixed(4)}`}
              </p>
              <a
                href={`https://www.google.com/maps?q=${item.location.lat},${item.location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm hover:underline inline-flex items-center"
              >
                Ver en Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* ✅ Botón de WhatsApp */}
        {item.ownerId?.phone && !isOwner && (
          <a
            href={`https://wa.me/${cleanPhone(item.ownerId.phone)}?text=Hola%20${encodeURIComponent(item.ownerId.name)},%20vi%20tu%20publicación%20"${encodeURIComponent(item.title)}"%20en%20CirculApp%20y%20me%20interesa.`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center w-full md:w-auto"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.48 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contactar por WhatsApp
          </a>
        )}

        {/* ✅ Botón de calificación (RF06) */}
        {user && !isOwner && (
          <button
            onClick={() => navigate(`/rate?itemId=${item._id}&ownerId=${item.ownerId._id}&ownerName=${encodeURIComponent(item.ownerId.name)}`)}
            className="mt-4 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark flex items-center justify-center w-full md:w-auto"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Calificar al ofertante
          </button>
        )}

        {/* Modal de imagen ampliada */}
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