// frontend/src/pages/Educational.jsx
import Layout from '../components/Layout';

export default function Educational() {
  const materials = [
    {
      id: 'plastico',
      name: 'Plástico',
      steps: [
        'Lavar y secar los envases',
        'Quitar etiquetas y tapas (separar por tipo)',
        'Aplastar para reducir volumen',
        'Almacenar en bolsa seca y cerrada'
      ],
      videoUrl: 'https://example.com/video-plastico.mp4' // Reemplazar con URL real
    },
    {
      id: 'papel',
      name: 'Papel y Cartón',
      steps: [
        'Asegurarse de que esté seco y limpio',
        'Quitar cintas adhesivas y plásticos',
        'Aplastar cajas',
        'Atar con cuerda o colocar en caja'
      ],
      videoUrl: 'https://example.com/video-papel.mp4'
    },
    {
      id: 'vidrio',
      name: 'Vidrio',
      steps: [
        'Enjuagar bien',
        'Separar por color (transparente, verde, ámbar)',
        'No romper (peligroso y difícil de reciclar)',
        'Entregar en contenedor rígido'
      ],
      videoUrl: 'https://example.com/video-vidrio.mp4'
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Guías de Procesamiento de Materiales</h2>
        <p className="text-gray-600 mb-8">
          Aprende cómo preparar correctamente tus materiales para facilitar su reciclaje y reutilización.
        </p>

        <div className="space-y-8">
          {materials.map(material => (
            <div key={material.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-green-700 mb-4">{material.name}</h3>
              
              <div className="mb-4">
                <p className="font-medium mb-2">Pasos recomendados:</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700">
                  {material.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600">📹 Video tutorial (simulado):</p>
                <div className="mt-2 bg-gray-100 border-2 border-dashed rounded-xl w-full h-40 flex items-center justify-center text-gray-500">
                  Reproductor de video para {material.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}