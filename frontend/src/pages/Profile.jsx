// frontend/src/pages/Profile.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import API from '../services/Api';
import { useNavigate } from 'react-router-dom';

// ✅ Función de validación de teléfono argentino
const isValidPhone = (phone) => {
  const clean = phone.replace(/\D/g, '');
  return /^54[1-9]\d{9,11}$/.test(clean);
};

export default function Profile() {
  const { user, logout, updateUser } = useContext(AuthContext); // ← updateUser incluido
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [myItems, setMyItems] = useState([]);
  const [reviews, setReviews] = useState({
    ratings: [],
    averages: { materialQuality: 0, punctuality: 0, standardCompliance: 0 },
    total: 0,
    loading: true
  });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  });

  // Inicializar datos del perfil
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  // Cargar mis productos
  useEffect(() => {
    const fetchUserItems = async () => {
      if (!user) return;
      try {
        const res = await API.get(`/items?ownerId=${user.id}`);
        setMyItems(res.data);
      } catch (err) {
        console.error('Error al cargar tus publicaciones:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserItems();
  }, [user]);

  // Cargar reseñas
  useEffect(() => {
    const fetchReviews = async () => {
      if (activeTab !== 'reviews' || !user) return;
      setReviews(prev => ({ ...prev, loading: true }));
      try {
        const res = await API.get(`/ratings/user/${user.id}`);
        setReviews(res.data);
      } catch (err) {
        console.error('Error al cargar reseñas:', err);
        setReviews({ ratings: [], averages: {}, total: 0, loading: false });
      }
    };
    fetchReviews();
  }, [activeTab, user]);

  const handleDelete = async (itemId) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta publicación?')) return;
    try {
      await API.delete(`/items/${itemId}`);
      setMyItems(myItems.filter(item => item._id !== itemId));
    } catch (err) {
      alert('Error al eliminar: ' + (err.response?.data?.msg || 'Inténtalo más tarde.'));
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    if (profileData.phone && !isValidPhone(profileData.phone)) {
      alert('Por favor, ingresa un número de teléfono argentino válido (ej: +54 9 11 1234-5678).');
      return;
    }

    try {
      const cleanPhone = profileData.phone.replace(/\D/g, '');
      const payload = { ...profileData, phone: cleanPhone };

      const res = await API.put('/users/profile', payload);
      
      // ✅ Actualiza el contexto global → UI en tiempo real
      updateUser(res.data);

      alert('Perfil actualizado exitosamente.');
      setEditMode(false);
    } catch (err) {
      alert('Error al guardar: ' + (err.response?.data?.msg || 'Inténtalo más tarde.'));
    }
  };

  if (!user) return null;

  const tabs = [
    { id: 'profile', name: 'Perfil' },
    { id: 'products', name: 'Mis Productos' },
    { id: 'reviews', name: 'Reseñas' },
    { id: 'settings', name: 'Configuración' }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header del perfil */}
        <div className="bg-background-paper p-6 rounded-lg shadow mb-6 flex flex-col md:flex-row items-center">
          <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 md:mb-0 md:mr-6">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-text-primary">{user.name}</h1>
            <p className="text-text-secondary">{user.email}</p>
            <p className="text-sm text-text-secondary mt-1">
              {user.role === 'user' ? 'Usuario Individual' : user.role}
            </p>
          </div>
        </div>

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

        {/* Contenido */}
        <div className="bg-background-paper p-6 rounded-lg shadow">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-4">Información Personal</h2>
              {editMode ? (
                <form onSubmit={handleSaveProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-text-primary mb-1">Nombre *</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-text-primary mb-1">Email *</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-text-primary mb-1">Teléfono *</label>
                      <input
                        type="text"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
                        placeholder="+54 9 11 1234-5678"
                        required
                      />
                      <p className="text-xs text-text-secondary mt-1">
                        Ej: +54 9 11 1234-5678 (obligatorio para WhatsApp)
                      </p>
                    </div>
                    <div>
                      <label className="block text-text-primary mb-1">Ubicación</label>
                      <input
                        type="text"
                        value={profileData.location || ''}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
                        placeholder="Córdoba, Argentina"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-text-primary mb-1">Biografía</label>
                      <textarea
                        value={profileData.bio || ''}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
                        rows="3"
                        maxLength="500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 text-text-primary hover:bg-gray-100 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p><span className="font-medium">Nombre:</span> {user.name}</p>
                      <p><span className="font-medium">Email:</span> {user.email}</p>
                      <p><span className="font-medium">Teléfono:</span> {user.phone || 'No disponible'}</p>
                    </div>
                    <div>
                      <p><span className="font-medium">Ubicación:</span> {user.location || 'No disponible'}</p>
                      <p><span className="font-medium">Miembro desde:</span> 2025</p>
                      <p><span className="font-medium">Biografía:</span> {user.bio || 'Sin biografía'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditMode(true)}
                    className="mt-6 bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark"
                  >
                    Editar Perfil
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-text-primary">Mis Productos ({myItems.length})</h2>
                <button
                  onClick={() => navigate('/publish')}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                >
                  Nuevo Producto
                </button>
              </div>
              {loading ? (
                <p>Cargando...</p>
              ) : myItems.length === 0 ? (
                <div className="text-center py-8 text-text-secondary">
                  <p>No tienes productos publicados aún.</p>
                  <button
                    onClick={() => navigate('/publish')}
                    className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                  >
                    Crear tu primer producto
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myItems.map(item => (
                    <div key={item._id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                      <div className="cursor-pointer" onClick={() => navigate(`/items/${item._id}`)}>
                        <h3 className="font-bold text-text-primary">{item.title}</h3>
                        <p className="text-sm text-text-secondary capitalize">{item.category}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item._id);
                        }}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Reseñas Recibidas ({reviews.total})
              </h2>
              {reviews.loading ? (
                <p>Cargando...</p>
              ) : reviews.total === 0 ? (
                <p className="text-text-secondary">Aún no tienes reseñas.</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-background-paper rounded border">
                      <div className="text-2xl font-bold text-primary">
                        {reviews.averages.materialQuality}
                      </div>
                      <div className="text-sm text-text-secondary">Calidad del material</div>
                    </div>
                    <div className="text-center p-4 bg-background-paper rounded border">
                      <div className="text-2xl font-bold text-primary">
                        {reviews.averages.punctuality || '—'}
                      </div>
                      <div className="text-sm text-text-secondary">Puntualidad</div>
                    </div>
                    <div className="text-center p-4 bg-background-paper rounded border">
                      <div className="text-2xl font-bold text-primary">
                        {reviews.averages.standardCompliance || '—'}
                      </div>
                      <div className="text-sm text-text-secondary">Cumplimiento de estándares</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {reviews.ratings.map((rating, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between">
                          <div>
                            <span className="font-medium">{rating.raterId?.name || 'Usuario'}</span>
                            <span className="text-sm text-text-secondary ml-2">
                              {new Date(rating.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-yellow-500">
                            {'★'.repeat(rating.materialQuality)}{'☆'.repeat(5 - rating.materialQuality)}
                          </div>
                        </div>
                        <p className="mt-2 text-text-secondary">
                          <span className="font-medium">Calidad:</span> {rating.materialQuality}/5
                        </p>
                        {rating.punctuality && (
                          <p className="text-text-secondary">
                            <span className="font-medium">Puntualidad:</span> {rating.punctuality}/5
                          </p>
                        )}
                        {rating.standardCompliance && (
                          <p className="text-text-secondary">
                            <span className="font-medium">Estándares:</span> {rating.standardCompliance}/5
                          </p>
                        )}
                        {rating.comment && (
                          <p className="mt-2 italic">"{rating.comment}"</p>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-4">Configuración</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-text-primary">Notificaciones</h3>
                  <label className="flex items-center mt-2">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-text-secondary">Recibir notificaciones por email</span>
                  </label>
                  <label className="flex items-center mt-2">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-text-secondary">Notificaciones push</span>
                  </label>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">Seguridad</h3>
                  <button className="mt-2 text-primary hover:underline">Cambiar Contraseña</button>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary text-red-600">Eliminar Cuenta</h3>
                  <button
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de eliminar tu cuenta? Esta acción es irreversible.')) {
                        logout();
                        navigate('/');
                      }
                    }}
                    className="mt-2 text-red-600 hover:underline"
                  >
                    Eliminar Cuenta
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}