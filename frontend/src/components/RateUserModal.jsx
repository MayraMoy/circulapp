// frontend/src/components/RateUserModal.jsx
import { useState } from 'react';
import API from '../services/Api';

export default function RateUserModal({ itemId, ownerId, ownerName, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    materialQuality: 3,
    punctuality: '',
    standardCompliance: '',
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al enviar la calificación.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-background-paper rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-text-primary mb-4">Calificar a {ownerName}</h2>
        
        {error && <div className="bg-error-light text-error p-2 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Calidad del material */}
          <div className="mb-4">
            <label className="block text-text-primary mb-2">Calidad del material donado *</label>
            <select
              name="materialQuality"
              value={formData.materialQuality}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
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
            <label className="block text-text-primary mb-2">Puntualidad en la entrega/recolección</label>
            <select
              name="punctuality"
              value={formData.punctuality}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
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
            <label className="block text-text-primary mb-2">Cumplimiento de estándares de procesamiento</label>
            <select
              name="standardCompliance"
              value={formData.standardCompliance}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
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
            <label className="block text-text-primary mb-2">Comentario (opcional)</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none"
              rows="3"
              maxLength="500"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose} // ✅ Cierra el modal sin guardar
              className="px-4 py-2 text-text-primary hover:bg-gray-100 rounded font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-4 py-2 rounded font-medium hover:bg-primary-dark transition"
            >
              {loading ? 'Enviando...' : 'Enviar Calificación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}