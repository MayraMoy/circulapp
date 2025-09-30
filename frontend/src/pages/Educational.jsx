// frontend/src/pages/Educational.jsx
import Layout from '../components/Layout';

export default function Educational() {
  const materials = [
    {
      id: 'plastico',
      name: 'Plástico',
      icon: '♻️',
      steps: [
        'Lavar y secar los envases',
        'Quitar etiquetas y tapas (separar por tipo)',
        'Aplastar para reducir volumen',
        'Almacenar en bolsa seca y cerrada'
      ],
      videoUrl: 'https://example.com/video-plastico.mp4'
    },
    {
      id: 'papel',
      name: 'Papel y Cartón',
      icon: '📄',
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
      icon: '🍶',
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
      <div className="max-w-6xl mx-auto px-4">
        {/* Header con gradiente */}
        <div className="bg-gradient-hero text-white rounded-2xl p-8 mb-8 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Guías de Procesamiento de Materiales
          </h1>
          <p className="text-lg text-gray-100 max-w-3xl">
            Aprende cómo preparar correctamente tus materiales para facilitar su reciclaje y reutilización.
          </p>
        </div>

        {/* Grid de materiales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map(material => (
            <div 
              key={material.id} 
              className="bg-background-paper rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
            >
              {/* Header de tarjeta con color */}
              <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-white">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{material.icon}</span>
                  <h3 className="text-2xl font-bold">{material.name}</h3>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <div className="mb-6">
                  <p className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-secondary text-xl">✓</span>
                    Pasos recomendados:
                  </p>
                  <ol className="space-y-3">
                    {material.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-text-secondary">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Video placeholder mejorado */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">📹</span>
                    <p className="text-sm font-medium text-text-primary">
                      Video tutorial
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-48 flex flex-col items-center justify-center text-text-secondary hover:border-primary transition-colors">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
                      <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">Reproductor de video</p>
                    <p className="text-xs text-text-disabled mt-1">{material.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner de consejos adicionales */}
        <div className="mt-10 bg-gradient-to-r from-secondary-light to-secondary rounded-2xl p-8 text-white shadow-lg">
          <h3 className="text-2xl font-bold mb-4">💡 Consejos Generales</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
            <li className="flex items-start gap-3">
              <span className="text-2xl">🧼</span>
              <div>
                <strong>Limpieza:</strong> Los materiales limpios tienen mayor valor y son más fáciles de procesar.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">📦</span>
              <div>
                <strong>Almacenamiento:</strong> Guarda los materiales en un lugar seco y ventilado.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🔍</span>
              <div>
                <strong>Separación:</strong> Clasifica por tipo de material para facilitar el reciclaje.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <strong>Acción rápida:</strong> Procesa los materiales lo antes posible para evitar degradación.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}