// frontend/src/pages/DashboardGestor.jsx
import { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import API from '../services/Api';
import { useNavigate } from 'react-router-dom';

export default function DashboardGestor() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' o 'toValidate'
  const [pendingItems, setPendingItems] = useState([]);
  const [toValidateItems, setToValidateItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchItems = useCallback(async () => {
    if (!user || user.role !== 'gestor') return;

    setLoading(true);
    setError('');
    try {
      // Ítems pendientes de procesar (sin_procesar, en_proceso)
      const pendingRes = await API.get('/items?processingState=sin_procesar');
      const inProgressRes = await API.get('/items?processingState=en_proceso');
      setPendingItems([...pendingRes.data, ...inProgressRes.data]);

      // Ítems listos para validar (fardado)
      const toValidateRes = await API.get('/items?processingState=fardado');
      setToValidateItems(toValidateRes.data);
    } catch (err) {
      console.error('Error al cargar ítems:', err);
      setError('No se pudieron cargar los ítems. Inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleMarkAsBaled = async (itemId) => {
    if (window.confirm('¿Marcar este material como fardado?')) {
      try {
        await API.patch(`/items/${itemId}/bale`);
        fetchItems(); // Recargar ambas listas
      } catch (err) {
        alert('Error al marcar como fardado: ' + (err.response?.data?.msg || 'Inténtalo más tarde.'));
      }
    }
  };

  if (!user || user.role !== 'gestor') {
    navigate('/dashboard');
    return null;
  }

  const tabs = [
    { id: 'pending', name: 'Ítems Pendientes de Procesamiento' },
    { id: 'toValidate', name: 'Fardos Pendientes de Validación' }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Dashboard - Gestor de Materiales</h1>

        {/* Pestañas */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {error && <div className="bg-error-light text-error p-3 rounded mb-4">{error}</div>}

        {loading ? (
          <p className="text-text-secondary">Cargando...</p>
        ) : activeTab === 'pending' ? (
          <div className="bg-background-paper p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-text-primary">Ítems Pendientes de Procesamiento</h2>
              <button
                onClick={() => navigate('/search?processingState=sin_procesar')}
                className="text-primary hover:underline text-sm"
              >
                Ver todos →
              </button>
            </div>
            {pendingItems.length === 0 ? (
              <p className="text-text-secondary">No hay ítems pendientes de procesamiento.</p>
            ) : (
              <div className="space-y-4">
                {pendingItems.map(item => (
                  <div key={item._id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-text-primary">{item.title}</h3>
                    <p className="text-sm text-text-secondary capitalize">
                      Estado: {item.processingState}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      {item.address || (item.location ? `${item.location.lat.toFixed(4)}, ${item.location.lng.toFixed(4)}` : '')}
                    </p>
                    <button
                      onClick={() => handleMarkAsBaled(item._id)}
                      className="mt-2 bg-secondary text-white px-3 py-1 rounded text-sm hover:bg-secondary-dark"
                    >
                      Marcar como Fardado
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-background-paper p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-text-primary">Fardos Pendientes de Validación</h2>
              <button
                onClick={() => navigate('/search?processingState=fardado')}
                className="text-primary hover:underline text-sm"
              >
                Ver todos →
              </button>
            </div>
            {toValidateItems.length === 0 ? (
              <p className="text-text-secondary">No hay fardos pendientes de validación.</p>
            ) : (
              <div className="space-y-4">
                {toValidateItems.map(item => (
                  <div key={item._id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-text-primary">{item.title}</h3>
                    <p className="text-sm text-text-secondary capitalize">
                      {item.category}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      {item.address || (item.location ? `${item.location.lat.toFixed(4)}, ${item.location.lng.toFixed(4)}` : '')}
                    </p>
                    <button
                      onClick={() => navigate(`/validate?itemId=${item._id}`)}
                      className="mt-2 bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary-dark"
                    >
                      Validar Fardo
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Acceso rápido a otras funcionalidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div
            onClick={() => navigate('/agenda')}
            className="bg-secondary text-white p-6 rounded-lg shadow cursor-pointer hover:bg-secondary-dark"
          >
            <h2 className="text-xl font-bold mb-2">Agenda de Recolección</h2>
            <p>Crear y gestionar rutas de recolección optimizadas.</p>
          </div>
          <div
            onClick={() => navigate('/historial')}
            className="bg-tertiary text-white p-6 rounded-lg shadow cursor-pointer hover:bg-tertiary-dark"
          >
            <h2 className="text-xl font-bold mb-2">Archivo Histórico</h2>
            <p>Acceder al historial de validaciones y transacciones.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}