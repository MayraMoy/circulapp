// frontend/src/pages/SearchItems.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import API from '../services/Api';

export default function SearchItems() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    query: '',
    category: '',
    processingState: ''
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: '', name: 'Todas las categorías', icon: '🔍' },
    { id: 'plastico', name: 'Plástico', icon: '♻️' },
    { id: 'papel', name: 'Papel', icon: '📄' },
    { id: 'vidrio', name: 'Vidrio', icon: '🍶' },
    { id: 'metal', name: 'Metal', icon: '🔩' },
    { id: 'textil', name: 'Textil', icon: '👕' },
    { id: 'electronico', name: 'Electrónico', icon: '💻' }
  ];

  const states = [
    { id: '', name: 'Cualquier estado', color: 'gray' },
    { id: 'sin_procesar', name: 'Sin procesar', color: 'gray' },
    { id: 'en_proceso', name: 'En proceso', color: 'yellow' },
    { id: 'fardado', name: 'Fardado', color: 'blue' },
    { id: 'validado', name: 'Validado', color: 'green' }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.query) params.append('query', filters.query);
        if (filters.category) params.append('category', filters.category);
        if (filters.processingState) params.append('processingState', filters.processingState);

        const res = await API.get(`/items?${params.toString()}`);
        setItems(res.data);
      } catch (err) {
        console.error(err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.query) params.append('query', filters.query);
      if (filters.category) params.append('category', filters.category);
      if (filters.processingState) params.append('processingState', filters.processingState);

      const res = await API.get(`/items?${params.toString()}`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    search();
  };

  const getStateColor = (stateId) => {
    const state = states.find(s => s.id === stateId);
    return state?.color || 'gray';
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.icon || '📦';
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4">
        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-text-secondary hover:text-primary flex items-center gap-2 font-medium transition-colors"
        >
          <span className="text-xl">←</span>
          Volver
        </button>

        {/* Header con gradiente */}
        <div className="bg-gradient-hero text-white rounded-2xl p-8 mb-8 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            🔍 Buscar Materiales o Servicios
          </h1>
          <p className="text-lg text-gray-100 max-w-3xl">
            Encuentra materiales reciclables y servicios de procesamiento cerca de ti
          </p>
        </div>

        {/* Formulario de búsqueda mejorado */}
        <form onSubmit={handleSearch} className="bg-background-paper rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Búsqueda por palabra */}
            <div>
              <label className="block text-text-primary font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">🔎</span>
                Buscar por palabra
              </label>
              <input
                type="text"
                name="query"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Ej: botellas, cartón..."
                value={filters.query}
                onChange={handleFilterChange}
              />
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-text-primary font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">📦</span>
                Categoría
              </label>
              <select
                name="category"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all cursor-pointer"
                value={filters.category}
                onChange={handleFilterChange}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Estado de procesamiento */}
            <div>
              <label className="block text-text-primary font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">⚙️</span>
                Estado de procesamiento
              </label>
              <select
                name="processingState"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all cursor-pointer"
                value={filters.processingState}
                onChange={handleFilterChange}
              >
                {states.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-all font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span className="text-xl">🔍</span>
            Buscar Materiales
          </button>
        </form>

        {/* Resultados */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-text-primary">
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  Buscando...
                </span>
              ) : (
                <>
                  Resultados <span className="text-primary">({items.length})</span>
                </>
              )}
            </h3>
            
            {items.length > 0 && (
              <div className="text-sm text-text-secondary bg-gray-50 px-4 py-2 rounded-lg">
                {items.length} {items.length === 1 ? 'material encontrado' : 'materiales encontrados'}
              </div>
            )}
          </div>

          {items.length === 0 && !loading ? (
            <div className="bg-gray-50 rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                No se encontraron materiales
              </h3>
              <p className="text-text-secondary mb-6">
                Intenta ajustar tus filtros de búsqueda o prueba con otros términos
              </p>
              <button
                onClick={() => {
                  setFilters({ query: '', category: '', processingState: '' });
                  search();
                }}
                className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary-dark transition-colors font-medium"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(item => {
                const stateColor = getStateColor(item.processingState);
                const colorClasses = {
                  gray: 'bg-gray-100 text-gray-800 border-gray-300',
                  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
                  blue: 'bg-blue-100 text-blue-800 border-blue-300',
                  green: 'bg-success-light text-success-dark border-success'
                };

                return (
                  <div
                    key={item._id}
                    className="bg-background-paper border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-primary group"
                    onClick={() => navigate(`/items/${item._id}`)}
                  >
                    {/* Imagen o placeholder */}
                    {item.images && item.images.length > 0 ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {item.images.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-medium">
                            +{item.images.length - 1} fotos
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-6xl opacity-40">
                          {getCategoryIcon(item.category)}
                        </span>
                      </div>
                    )}

                    {/* Contenido */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-lg text-text-primary group-hover:text-primary transition-colors line-clamp-2 flex-1">
                          {item.title}
                        </h4>
                      </div>

                      <div className="flex gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 bg-primary-light text-primary px-3 py-1 rounded-full text-xs font-medium">
                          <span>{getCategoryIcon(item.category)}</span>
                          {categories.find(c => c.id === item.category)?.name || item.category}
                        </span>
                      </div>

                      <div className="mb-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${colorClasses[stateColor]}`}>
                          <span>⚙️</span>
                          {item.processingState.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <div className="pt-3 border-t border-gray-200 flex items-center gap-2 text-sm text-text-secondary">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xs">
                          {(item.ownerId?.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-text-primary">
                          {item.ownerId?.name || 'Usuario'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}