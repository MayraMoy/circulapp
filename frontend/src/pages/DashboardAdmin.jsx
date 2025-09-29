// frontend/src/pages/DashboardAdmin.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import API from '../services/Api';
import { useNavigate } from 'react-router-dom';

export default function DashboardAdmin() {
  console.log('✅ DashboardAdmin renderizado');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    totalItems: 0,
    validatedItems: 0,
    co2Saved: 0,
    recyclingRate: 0,
    totalUsers: 0,
    activeGestores: 0
  });
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || user.role !== 'admin') {
        navigate('/dashboard');
        return;
      }

      try {
        // Llamadas reales al backend
        const [metricsRes, usersRes, itemsRes] = await Promise.all([
          API.get('/admin/metrics'),
          API.get('/admin/users'),
          API.get('/admin/items')
        ]);

        setMetrics(metricsRes.data);
        setUsers(usersRes.data);
        setItems(itemsRes.data);
      } catch (err) {
        console.error('Error al cargar datos del admin:', err);
        alert('Error al cargar el panel de administración.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handlePromote = async (userId) => {
    try {
      await API.post(`/admin/users/${userId}/promote`);
      // Actualizar lista
      const usersRes = await API.get('/admin/users');
      setUsers(usersRes.data);
      alert('Usuario promovido exitosamente.');
    } catch (err) {
      alert('Error al promover: ' + (err.response?.data?.msg || 'Inténtalo más tarde.'));
    }
  };

  const handleToggleActive = async (userId, currentActive) => {
    try {
      await API.put(`/admin/users/${userId}`, { active: !currentActive });
      const usersRes = await API.get('/admin/users');
      setUsers(usersRes.data);
    } catch (err) {
      alert('Error al actualizar estado.');
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Panel de Administración</h1>
        
        {/* Métricas Ambientales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Materiales Procesados', value: metrics.totalItems, icon: '📦' },
            { label: 'CO₂ Ahorrado', value: `${metrics.co2Saved} kg`, icon: '🌱' },
            { label: 'Tasa de Reciclaje', value: `${metrics.recyclingRate}%`, icon: '♻️' },
            { label: 'Usuarios Activos', value: metrics.totalUsers, icon: '👥' }
          ].map((metric, i) => (
            <div key={i} className="bg-background-paper p-4 rounded-lg shadow border-l-4 border-primary">
              <div className="text-2xl mb-1">{metric.icon}</div>
              <div className="text-xl font-bold text-text-primary">{metric.value}</div>
              <div className="text-sm text-text-secondary">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gestión de Usuarios */}
          <div className="bg-background-paper p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-text-primary">Gestión de Usuarios</h2>
              <button 
                onClick={() => navigate('/admin/users')}
                className="text-primary hover:underline text-sm"
              >
                Ver todos →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-text-secondary text-sm">
                    <th className="pb-2">Usuario</th>
                    <th className="pb-2">Rol</th>
                    <th className="pb-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 5).map(u => (
                    <tr key={u._id} className="border-t border-gray-200">
                      <td className="py-2">
                        <div className="font-medium">{u.name}</div>
                        <div className="text-sm text-text-secondary">{u.email}</div>
                      </td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          u.role === 'admin' ? 'bg-tertiary text-white' :
                          u.role === 'gestor' ? 'bg-secondary text-white' :
                          'bg-gray-200 text-text-primary'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-2">
                        {u.role === 'user' && (
                          <button
                            onClick={() => handlePromote(u._id)}
                            className="text-sm text-primary hover:underline mr-2"
                          >
                            Promover
                          </button>
                        )}
                        <button
                          onClick={() => handleToggleActive(u._id, u.active)}
                          className={`text-sm ${u.active ? 'text-error' : 'text-success'} hover:underline`}
                        >
                          {u.active ? 'Desactivar' : 'Activar'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trazabilidad de Materiales */}
          <div className="bg-background-paper p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-text-primary">Trazabilidad de Materiales</h2>
              <button 
                onClick={() => navigate('/admin/items')}
                className="text-primary hover:underline text-sm"
              >
                Exportar →
              </button>
            </div>
            <div className="space-y-3">
              {items.slice(0, 5).map(item => (
                <div key={item._id} className="border border-gray-200 rounded p-3">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-text-secondary capitalize">
                    Categoría: {item.category} • Estado: {item.processingState}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-text-secondary">
              <p>• Total de materiales: {metrics.totalItems}</p>
              <p>• Validados: {metrics.validatedItems}</p>
              <p>• Reporte generado el: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Reportes para la Comuna */}
        <div className="mt-8 bg-background-paper p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-text-primary mb-4">Reportes para la Comuna</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => window.open('/api/admin/reports/monthly', '_blank')}
              className="border border-gray-300 p-4 rounded hover:bg-gray-50 text-center"
            >
              <div className="font-medium">Mensual</div>
              <div className="text-sm text-text-secondary">Resumen de actividad</div>
            </button>
            <button 
              onClick={() => window.open('/api/admin/reports/environmental', '_blank')}
              className="border border-gray-300 p-4 rounded hover:bg-gray-50 text-center"
            >
              <div className="font-medium">Ambiental</div>
              <div className="text-sm text-text-secondary">CO₂ y reciclaje</div>
            </button>
            <button 
              onClick={() => window.open('/api/admin/reports/validations', '_blank')}
              className="border border-gray-300 p-4 rounded hover:bg-gray-50 text-center"
            >
              <div className="font-medium">Validaciones</div>
              <div className="text-sm text-text-secondary">Materiales certificados</div>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}