// frontend/src/pages/Profile.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import API from '../services/Api';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserItems = async () => {
      try {
        const res = await API.get(`/items?ownerId=${user.id}`);
        setItems(res.data);
      } catch (err) {
        console.error('Error al cargar tus publicaciones:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchUserItems();
  }, [user]);

  const handleDelete = async (itemId) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta publicación?')) return;

    try {
      await API.delete(`/items/${itemId}`);
      setItems(items.filter(item => item._id !== itemId));
    } catch (err) {
      alert('Error al eliminar: ' + (err.response?.data?.msg || 'Inténtalo más tarde.'));
    }
  };

  if (!user) return null;

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
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-gray-600 hover:text-gray-900 flex items-center"
        >
          ← Volver
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Mi Perfil</h2>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500 mt-1">Rol: {user.role}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Mis Publicaciones ({items.length})</h3>

          {loading ? (
            <p>Cargando...</p>
          ) : items.length === 0 ? (
            <p className="text-gray-600">No has publicado ningún material aún.</p>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:justify-between md:items-start hover:shadow-md transition cursor-pointer"
                  onClick={() => navigate(`/items/${item._id}`)} // ← clic para ver detalle
                >
                  <div className="mb-3 md:mb-0">
                    <h4 className="font-bold text-blue-700 hover:underline">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Estado: {processingStates[item.processingState] || item.processingState}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      📍 {item.address || `${item.location.lat.toFixed(4)}, ${item.location.lng.toFixed(4)}`}
                    </p>
                    {item.images && item.images.length > 0 && (
                      <div className="mt-2 flex gap-1">
                        {item.images.slice(0, 2).map((url, idx) => (
                          <img
                            key={idx}
                            src={url}
                            alt={`preview ${idx}`}
                            className="w-10 h-10 object-cover rounded border"
                          />
                        ))}
                        {item.images.length > 2 && (
                          <div className="w-10 h-10 bg-gray-100 rounded border flex items-center justify-center text-xs">
                            +{item.images.length - 2}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // evita que el clic se propague al contenedor
                      handleDelete(item._id);
                    }}
                    className="text-red-600 hover:text-red-800 font-medium self-start md:self-center"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}