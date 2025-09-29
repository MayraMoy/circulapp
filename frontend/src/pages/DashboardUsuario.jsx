// src/pages/DashboardUsuario.jsx - Versión corregida
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { LoadingSpinner, ItemSkeleton } from '../components/LoadingSpinner';
import { useErrorHandler, ErrorToast } from '../hooks/useErrorHandler';
import API from '../services/Api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { error, isLoading, handleAsync, clearError } = useErrorHandler();
  
  const [myItems, setMyItems] = useState([]);
  const [nearbyItems, setNearbyItems] = useState([]);
  const [stats, setStats] = useState({
    totalPublished: 0,
    totalValidated: 0,
    impactScore: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      await handleAsync(async () => {
        // Obtener mis productos
        const myRes = await API.get(`/items?ownerId=${user.id}`);
        setMyItems(myRes.data);

        // Obtener productos cercanos
        const nearbyRes = await API.get('/items?limit=6');
        const filtered = nearbyRes.data.filter(item => item.ownerId?._id !== user.id);
        setNearbyItems(filtered);

        // Calcular estadísticas
        setStats({
          totalPublished: myRes.data.length,
          totalValidated: myRes.data.filter(item => item.processingState === 'validado').length,
          impactScore: myRes.data.length * 10 // Simulado
        });
      });
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user, handleAsync]);

  if (!user) return null;

  if (isLoading && myItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <ItemSkeleton key={i} />)}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <ItemSkeleton key={i} />)}
                </div>
              </div>
            </div>
          </div>
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

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <ErrorToast error={error} onClose={clearError} />
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            ¡Hola, {user.name}! 👋
          </h1>
          <div className="text-right">
            <p className="text-sm text-gray-500">Impacto ambiental</p>
            <p className="text-2xl font-bold text-green-600">{stats.impactScore} pts</p>
          </div>
        </div>

        {/* Cards de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <h3 className="text-lg font-medium">Materiales publicados</h3>
            <p className="text-3xl font-bold">{stats.totalPublished}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg">
            <h3 className="text-lg font-medium">Validados</h3>
            <p className="text-3xl font-bold">{stats.totalValidated}</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg">
            <h3 className="text-lg font-medium">En proceso</h3>
            <p className="text-3xl font-bold">{stats.totalPublished - stats.totalValidated}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mis Productos Recientes */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                📦 Mis Productos Recientes
              </h2>
              <button
                onClick={() => navigate('/profile')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
              >
                Ver todos →
              </button>
            </div>

            {myItems.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📤</div>
                <p className="mb-4">No has publicado ningún material aún.</p>
                <button
                  onClick={() => navigate('/publish')}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Publicar tu primer material
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myItems.slice(0, 3).map(item => (
                  <div
                    key={item._id}
                    className="flex gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => navigate(`/items/${item._id}`)}
                  >
                    <img
                      src={item.images?.[0] || 'https://via.placeholder.com/80'}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 capitalize mb-1">
                        {categoryNames[item.category] || item.category}
                      </p>
                      <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                        item.processingState === 'validado' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {item.processingState}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Productos Cerca de Ti */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                🌍 Productos Cerca de Ti
              </h2>
              <button
                onClick={() => navigate('/search')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
              >
                Ver más →
              </button>
            </div>

            {isLoading ? (
              <LoadingSpinner message="Buscando materiales cercanos..." />
            ) : nearbyItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-3">🔍</div>
                <p>No hay materiales disponibles cerca de tu ubicación.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {nearbyItems.slice(0, 3).map(item => (
                  <div
                    key={item._id}
                    className="flex gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => navigate(`/items/${item._id}`)}
                  >
                    <img
                      src={item.images?.[0] || 'https://via.placeholder.com/80'}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 capitalize mb-1">
                        {categoryNames[item.category] || item.category}
                      </p>
                      <p className="text-xs text-gray-500">
                        Por: {item.ownerId?.name || 'Usuario'}
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