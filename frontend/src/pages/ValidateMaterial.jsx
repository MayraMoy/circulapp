// frontend/src/pages/ValidateMaterial.jsx
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Layout from '../components/Layout';

export default function ValidateMaterial() {
  const { user } = useContext(AuthContext);

  // Solo gestores pueden acceder
  if (user?.role !== 'gestor') {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Acceso denegado</h2>
          <p className="text-gray-700">
            Solo los <strong>Gestores de Materiales</strong> pueden validar fardos.
          </p>
        </div>
      </Layout>
    );
  }

  const checklist = [
    { id: 'limpieza', label: 'Material limpio y seco', done: false },
    { id: 'homogeneidad', label: '100% del mismo tipo de material', done: false },
    { id: 'compactado', label: 'Bien compactado y atado', done: false },
    { id: 'etiquetado', label: 'Etiqueta con tipo y peso visible', done: false }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Validación enviada (simulada). En producción, se generaría certificación digital.');
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Validar Material Fardado</h2>
        <p className="text-gray-600 mb-6">
          Verifica que el material cumpla con la metodología estandarizada de la Comuna.
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">ID del fardo o publicación</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Ej: F-2025-0456"
              required
            />
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Checklist de validación</h3>
            <div className="space-y-3">
              {checklist.map(item => (
                <label key={item.id} className="flex items-start space-x-3">
                  <input type="checkbox" className="mt-1 h-5 w-5 text-green-600 rounded" />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Observaciones (opcional)</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="3"
              placeholder="Ej: Falta etiqueta de peso..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Certificar Material
          </button>
        </form>
      </div>
    </Layout>
  );
}