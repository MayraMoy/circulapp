// frontend/src/pages/Profile.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import API from '../services/Api';
import { useNavigate } from 'react-router-dom';

const isValidPhone = (phone) => {
  const clean = phone.replace(/\D/g, '');
  return /^54[1-9]\d{9,11}$/.test(clean);
};

export default function Profile() {
  const { user, logout, updateUser } = useContext(AuthContext);
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
      updateUser(res.data);
      alert('Perfil actualizado exitosamente.');
      setEditMode(false);
    } catch (err) {
      alert('Error al guardar: ' + (err.response?.data?.msg || 'Inténtalo más tarde.'));
    }
  };

  if (!user) return null;

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: '👤' },
    { id: 'products', name: 'Mis Productos', icon: '📦' },
    { id: 'reviews', name: 'Reseñas', icon: '⭐' },
    { id: 'settings', name: 'Configuración', icon: '⚙️' }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header del perfil con gradiente */}
        <div className="bg-gradient-hero text-white p-8 rounded-2xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-white text-primary rounded-full flex items-center justify-center text-3xl font-bold shadow-xl ring-4 ring-primary-light">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-gray-100 text-lg mb-1">{user.email}</p>
              <div className="flex items-center gap-3 justify-center md:justify-start mt-3">
                <span className="bg-primary-light text-white px-3 py-1 rounded-full text-sm font-medium">
                  {user.role === 'user' ? 'Usuario Individual' : user.role}
                </span>
                {user.location && (
                  <span className="text-gray-100 text-sm flex items-center gap-1">
                    📍 {user.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pestañas modernas */}
        <div className="bg-background-paper rounded-2xl shadow-md mb-6 overflow-hidden">
          <nav className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-max px-6 py-4 font-medium text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white border-b-4 border-primary-dark'
                    : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Contenido */}
        <div className="bg-background-paper p-8 rounded-2xl shadow-md">
          {activeTab === 'profile' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Información Personal</h2>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary-dark transition-colors font-medium"
                  >
                    ✏️ Editar Perfil
                  </button>
                )}
              </div>

              {editMode ? (
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-text-primary font-medium mb-2">Nombre *</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-text-primary font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-text-primary font-medium mb-2">Teléfono *</label>
                      <input
                        type="text"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        placeholder="+54 9 11 1234-5678"
                        required
                      />
                      <p className="text-xs text-text-secondary mt-2">
                        📱 Ej: +54 9 11 1234-5678 (obligatorio para WhatsApp)
                      </p>
                    </div>
                    <div>
                      <label className="block text-text-primary font-medium mb-2">Ubicación</label>
                      <input
                        type="text"
                        value={profileData.location || ''}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        placeholder="Córdoba, Argentina"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-text-primary font-medium mb-2">Biografía</label>
                      <textarea
                        value={profileData.bio || ''}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        rows="4"
                        maxLength="500"
                        placeholder="Cuéntanos sobre ti..."
                      />
                      <p className="text-xs text-text-secondary mt-1 text-right">
                        {(profileData.bio || '').length}/500 caracteres
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
                    >
                      💾 Guardar Cambios
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="px-6 py-3 text-text-primary hover:bg-gray-100 rounded-lg transition-colors font-medium border-2 border-gray-200"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-2xl">👤</span>
                      <div>
                        <p className="text-sm text-text-secondary">Nombre</p>
                        <p className="font-medium text-text-primary">{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-2xl">📧</span>
                      <div>
                        <p className="text-sm text-text-secondary">Email</p>
                        <p className="font-medium text-text-primary">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-2xl">📱</span>
                      <div>
                        <p className="text-sm text-text-secondary">Teléfono</p>
                        <p className="font-medium text-text-primary">{user.phone || 'No disponible'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-2xl">📍</span>
                      <div>
                        <p className="text-sm text-text-secondary">Ubicación</p>
                        <p className="font-medium text-text-primary">{user.location || 'No disponible'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-2xl">📅</span>
                      <div>
                        <p className="text-sm text-text-secondary">Miembro desde</p>
                        <p className="font-medium text-text-primary">2025</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-2xl">📝</span>
                      <div>
                        <p className="text-sm text-text-secondary">Biografía</p>
                        <p className="font-medium text-text-primary">{user.bio || 'Sin biografía'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary">
                  Mis Productos <span className="text-primary">({myItems.length})</span>
                </h2>
                <button
                  onClick={() => navigate('/publish')}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-md"
                >
                  ➕ Nuevo Producto
                </button>
              </div>
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-text-secondary">Cargando...</p>
                </div>
              ) : myItems.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-xl text-text-primary font-medium mb-2">No tienes productos publicados aún</p>
                  <p className="text-text-secondary mb-6">Comienza a compartir materiales reciclables</p>
                  <button
                    onClick={() => navigate('/publish')}
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
                  >
                    Crear tu primer producto
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myItems.map(item => (
                    <div 
                      key={item._id} 
                      className="border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all cursor-pointer hover:border-primary"
                      onClick={() => navigate(`/items/${item._id}`)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-text-primary mb-1">{item.title}</h3>
                          <span className="inline-block bg-primary-light text-primary px-3 py-1 rounded-full text-xs font-medium capitalize">
                            {item.category}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item._id);
                          }}
                          className="text-error hover:text-error-dark font-medium px-3 py-1 rounded hover:bg-error-light transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                      <p className="text-sm text-text-secondary">
                        Estado: <span className="font-medium text-text-primary">{item.processingState}</span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Reseñas Recibidas <span className="text-primary">({reviews.total})</span>
              </h2>
              {reviews.loading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-text-secondary">Cargando reseñas...</p>
                </div>
              ) : reviews.total === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl">
                  <div className="text-6xl mb-4">⭐</div>
                  <p className="text-xl text-text-primary font-medium">Aún no tienes reseñas</p>
                  <p className="text-text-secondary mt-2">Las reseñas aparecerán cuando completes transacciones</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-primary-light to-primary p-6 rounded-xl text-white shadow-lg">
                      <div className="text-4xl font-bold mb-2">
                        {reviews.averages.materialQuality}
                      </div>
                      <div className="text-sm opacity-90">⭐ Calidad del material</div>
                    </div>
                    <div className="bg-gradient-to-br from-secondary-light to-secondary p-6 rounded-xl text-white shadow-lg">
                      <div className="text-4xl font-bold mb-2">
                        {reviews.averages.punctuality || '—'}
                      </div>
                      <div className="text-sm opacity-90">⏰ Puntualidad</div>
                    </div>
                    <div className="bg-gradient-to-br from-tertiary-light to-tertiary p-6 rounded-xl text-white shadow-lg">
                      <div className="text-4xl font-bold mb-2">
                        {reviews.averages.standardCompliance || '—'}
                      </div>
                      <div className="text-sm opacity-90">✓ Cumplimiento de estándares</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {reviews.ratings.map((rating, idx) => (
                      <div key={idx} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                              {(rating.raterId?.name || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <span className="font-semibold text-text-primary">
                                {rating.raterId?.name || 'Usuario'}
                              </span>
                              <p className="text-sm text-text-secondary">
                                {new Date(rating.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-warning text-xl">
                            {'★'.repeat(rating.materialQuality)}{'☆'.repeat(5 - rating.materialQuality)}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                          <div className="bg-gray-50 p-3 rounded-lg text-center">
                            <div className="font-bold text-primary text-lg">{rating.materialQuality}/5</div>
                            <div className="text-text-secondary">Calidad</div>
                          </div>
                          {rating.punctuality && (
                            <div className="bg-gray-50 p-3 rounded-lg text-center">
                              <div className="font-bold text-secondary text-lg">{rating.punctuality}/5</div>
                              <div className="text-text-secondary">Puntualidad</div>
                            </div>
                          )}
                          {rating.standardCompliance && (
                            <div className="bg-gray-50 p-3 rounded-lg text-center">
                              <div className="font-bold text-tertiary text-lg">{rating.standardCompliance}/5</div>
                              <div className="text-text-secondary">Estándares</div>
                            </div>
                          )}
                        </div>
                        {rating.comment && (
                          <p className="mt-3 p-4 bg-gray-50 rounded-lg italic text-text-secondary border-l-4 border-primary">
                            "{rating.comment}"
                          </p>
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
              <h2 className="text-2xl font-bold text-text-primary mb-6">⚙️ Configuración</h2>
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
                    <span className="text-2xl">🔔</span>
                    Notificaciones
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 hover:bg-white rounded-lg transition-colors cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary" defaultChecked />
                      <div>
                        <span className="text-text-primary font-medium">Notificaciones por email</span>
                        <p className="text-sm text-text-secondary">Recibe actualizaciones importantes</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 hover:bg-white rounded-lg transition-colors cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary" />
                      <div>
                        <span className="text-text-primary font-medium">Notificaciones push</span>
                        <p className="text-sm text-text-secondary">Alertas en tiempo real</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-lg text-text-primary mb-4 flex items-center gap-2">
                    <span className="text-2xl">🔒</span>
                    Seguridad
                  </h3>
                  <button className="text-primary hover:text-primary-dark font-medium flex items-center gap-2 p-3 hover:bg-white rounded-lg transition-colors">
                    <span>🔑</span>
                    Cambiar Contraseña
                  </button>
                </div>

                <div className="bg-error-light p-6 rounded-xl border-2 border-error">
                  <h3 className="font-bold text-lg text-error mb-4 flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Zona Peligrosa
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten certeza.
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de eliminar tu cuenta? Esta acción es irreversible.')) {
                        logout();
                        navigate('/');
                      }
                    }}
                    className="bg-error text-white px-6 py-3 rounded-lg hover:bg-error-dark transition-colors font-medium"
                  >
                    🗑️ Eliminar Cuenta Permanentemente
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