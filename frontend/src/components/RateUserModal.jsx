// frontend/src/components/RateUserModal.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../services/Api';

export default function RateUserModal() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    materialQuality: 3,
    punctuality: '',
    standardCompliance: '',
    comment: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [itemId, setItemId] = useState('');
  const [ownerName, setOwnerName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setItemId(params.get('itemId') || '');
    setOwnerName(decodeURIComponent(params.get('ownerName') || ''));
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemId) {
      setError('ID del ítem no válido.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await API.post('/ratings', {
        itemId,
        materialQuality: parseInt(formData.materialQuality),
        punctuality: formData.punctuality ? parseInt(formData.punctuality) : undefined,
        standardCompliance: formData.standardCompliance ? parseInt(formData.standardCompliance) : undefined,
        comment: formData.comment
      });
      
      alert('¡Gracias por tu calificación!');
      navigate(-1); // Volver a la página anterior
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al enviar la calificación.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Función para cancelar
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleCancel}
    >
      <div 
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Calificar a {ownerName}
        </h2>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Calidad del material */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Calidad del material donado *
            </label>
            <select
              name="materialQuality"
              value={formData.materialQuality}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>
                  {'★'.repeat(n)}{'☆'.repeat(5 - n)} ({n})
                </option>
              ))}
            </select>
          </div>

          {/* Puntualidad */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Puntualidad en la entrega/recolección
            </label>
            <select
              name="punctuality"
              value={formData.punctuality}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">No calificar</option>
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>
                  {'★'.repeat(n)}{'☆'.repeat(5 - n)} ({n})
                </option>
              ))}
            </select>
          </div>

          {/* Cumplimiento de estándares */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Cumplimiento de estándares de procesamiento
            </label>
            <select
              name="standardCompliance"
              value={formData.standardCompliance}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">No calificar</option>
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>
                  {'★'.repeat(n)}{'☆'.repeat(5 - n)} ({n})
                </option>
              ))}
            </select>
          </div>

          {/* Comentario */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Comentario (opcional)
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
              maxLength="500"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {loading ? 'Enviando...' : 'Enviar Calificación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}