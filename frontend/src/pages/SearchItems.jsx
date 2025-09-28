// frontend/src/pages/SearchItems.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ← añade useNavigate si quieres "Volver"
import Layout from '../components/Layout';
import API from '../services/Api';

export default function SearchItems() {
  const navigate = useNavigate(); // opcional: para botón "Volver"

  const [filters, setFilters] = useState({
    query: '',
    category: '',
    processingState: ''
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: '', name: 'Todas' },
    { id: 'plastico', name: 'Plástico' },
    { id: 'papel', name: 'Papel' },
    { id: 'vidrio', name: 'Vidrio' },
    { id: 'metal', name: 'Metal' },
    { id: 'textil', name: 'Textil' },
    { id: 'electronico', name: 'Electrónico' }
  ];

  const states = [
    { id: '', name: 'Cualquier estado' },
    { id: 'sin_procesar', name: 'Sin procesar' },
    { id: 'en_proceso', name: 'En proceso' },
    { id: 'fardado', name: 'Fardado' },
    { id: 'validado', name: 'Validado' }
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

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

  useEffect(() => {
    search();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    search();
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

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Buscar Materiales o Servicios</h2>

        <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Buscar por palabra</label>
              <input
                type="text"
                name="query"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Ej: botellas, cartón..."
                value={filters.query}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Categoría</label>
              <select
                name="category"
                className="w-full p-2 border border-gray-300 rounded"
                value={filters.category}
                onChange={handleFilterChange}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Estado de procesamiento</label>
              <select
                name="processingState"
                className="w-full p-2 border border-gray-300 rounded"
                value={filters.processingState}
                onChange={handleFilterChange}
              >
                {states.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Buscar
          </button>
        </form>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Resultados {loading ? '(cargando...)' : `(${items.length})`}
          </h3>
          {items.length === 0 && !loading ? (
            <p className="text-gray-600">No se encontraron materiales con esos filtros.</p>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                  onClick={() => navigate(`/items/${item._id}`)} // ← clic para ver detalle
                >
                  <div className="flex justify-between">
                    <h4 className="font-bold text-blue-700 hover:underline">
                      {item.title}
                    </h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {categories.find(c => c.id === item.category)?.name || item.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Estado: <span className="font-medium">{item.processingState}</span></p>
                  <p className="text-sm mt-2">Ofertado por: {item.ownerId?.name || 'Usuario'}</p>
                  {item.images && item.images.length > 0 && (
                    <div className="mt-2 flex gap-1">
                      {item.images.slice(0, 3).map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt={`preview ${idx}`}
                          className="w-10 h-10 object-cover rounded border"
                        />
                      ))}
                      {item.images.length > 3 && (
                        <div className="w-10 h-10 bg-gray-100 rounded border flex items-center justify-center text-xs">
                          +{item.images.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
