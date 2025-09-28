// frontend/src/pages/DashboardUsuario.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import API from '../services/Api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [myItems, setMyItems] = useState([]);
  const [nearbyItems, setNearbyItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Obtener mis productos
        const myRes = await API.get(`/items?ownerId=${user.id}`);
        setMyItems(myRes.data);

        // Obtener productos cercanos (simulado; en MVP real usarías geolocalización)
        const nearbyRes = await API.get('/items?limit=5');
        setNearbyItems(nearbyRes.data.filter(item => item.ownerId?._id !== user.id));
      } catch (err) {
        console.error('Error al cargar el dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchDashboardData();
  }, [user]);

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-text-primary mb-6">¡Hola {user.name}!</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mis Productos Recientes */}
          <div className="bg-background-paper p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-text-primary">Mis Productos Recientes</h2>
              <button
                onClick={() => navigate('/profile')}
                className="text-primary hover:underline text-sm font-medium"
              >
                Ver todos →
              </button>
            </div>
            {myItems.length === 0 ? (
              <div className="text-center py-8 text-text-secondary">
                <p>No has publicado ningún material aún.</p>
                <button
                  onClick={() => navigate('/publish')}
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                >
                  Publicar tu primer material
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myItems.slice(0, 3).map(item => (
                  <div
                    key={item._id}
                    className="flex gap-4 cursor-pointer"
                    onClick={() => navigate(`/items/${item._id}`)}
                  >
                    <img
                      src={item.images?.[0] || 'https://via.placeholder.com/80'}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium text-text-primary">{item.title}</h3>
                      <p className="text-sm text-text-secondary capitalize">
                        {item.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Productos Cerca de Ti */}
          <div className="bg-background-paper p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-text-primary">Productos Cerca de Ti</h2>
              <button
                onClick={() => navigate('/search')}
                className="text-primary hover:underline text-sm font-medium"
              >
                Ver más →
              </button>
            </div>
            {nearbyItems.length === 0 ? (
              <p className="text-text-secondary text-center py-4">
                No hay materiales disponibles cerca de tu ubicación.
              </p>
            ) : (
              <div className="space-y-4">
                {nearbyItems.slice(0, 3).map(item => (
                  <div
                    key={item._id}
                    className="flex gap-4 cursor-pointer"
                    onClick={() => navigate(`/items/${item._id}`)}
                  >
                    <img
                      src={item.images?.[0] || 'https://via.placeholder.com/80'}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium text-text-primary">{item.title}</h3>
                      <p className="text-sm text-text-secondary capitalize">
                        {item.category}
                      </p>
                      <p className="text-xs text-text-secondary mt-1">
                        Ofertado por: {item.ownerId?.name || 'Usuario'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}