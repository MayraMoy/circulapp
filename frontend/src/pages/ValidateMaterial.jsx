// frontend/src/pages/ValidateMaterial.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import API from '../services/Api';

export default function ValidateMaterial() {
  const navigate = useNavigate();
  const location = useLocation();
  const [itemId, setItemId] = useState('');
  const [checklist, setChecklist] = useState([]);
  const [observations, setObservations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('itemId');
    if (id) setItemId(id);
    else setError('No se proporcionó un ID de fardo válido.');
  }, [location]);

  const toggleCheck = (item) => {
    setChecklist(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checklist.length !== 4) {
      setError('Debes completar todos los ítems del checklist.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await API.post('/validation/validate', {
        itemId,
        checklist,
        observations
      });
      alert('✅ Material validado exitosamente.');
      navigate('/dashboard');
    } catch (err) {
      setError('Error: ' + (err.response?.data?.msg || 'Inténtalo más tarde.'));
    } finally {
      setLoading(false);
    }
  };

  const checklistItems = [
    { id: 'limpieza', label: 'Material limpio y seco' },
    { id: 'homogeneidad', label: '100% del mismo tipo de material' },
    { id: 'compactado', label: 'Bien compactado y atado' },
    { id: 'etiquetado', label: 'Etiqueta con tipo y peso visible' }
  ];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Validar Material Fardado</h2>
        <p className="text-text-secondary mb-6">
          Verifica que el material cumpla con la metodología estandarizada de la Comuna.
        </p>

        {error && <div className="bg-error-light text-error p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="bg-background-paper p-6 rounded-lg shadow">
          <div className="mb-6">
            <label className="block text-text-primary mb-2">ID del fardo o publicación</label>
            <input
              type="text"
              value={itemId}
              readOnly
              className="w-full p-3 bg-gray-100 rounded-lg"
            />
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-text-primary">Checklist de validación *</h3>
            <div className="space-y-3">
              {checklistItems.map(item => (
                <label key={item.id} className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={checklist.includes(item.id)}
                    onChange={() => toggleCheck(item.id)}
                    className="mt-1 h-5 w-5 text-primary rounded"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-text-primary mb-2">Observaciones (opcional)</label>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="3"
              placeholder="Ej: Falta etiqueta de peso..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition"
          >
            {loading ? 'Validando...' : 'Certificar Material'}
          </button>
        </form>
      </div>
    </Layout>
  );
}