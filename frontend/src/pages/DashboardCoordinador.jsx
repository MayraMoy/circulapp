// frontend/src/pages/DashboardCoordinador.jsx
import Layout from '../components/Layout';

export default function DashboardCoordinador() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Dashboard - Coordinador de Estación</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background-paper p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Planos Técnicos</h2>
            <p className="text-text-secondary">
              Accede a planos oficiales de estaciones de procesamiento con anotaciones y control de versiones.
            </p>
            <button className="mt-4 text-primary hover:underline">Ver planos →</button>
          </div>
          
          <div className="bg-background-paper p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Métricas de Compactado</h2>
            <p className="text-text-secondary">
              Monitorea volúmenes procesados, eficiencia de compactado y reportes ambientales.
            </p>
            <button className="mt-4 text-primary hover:underline">Ver métricas →</button>
          </div>
        </div>

        <div className="mt-8 bg-background-paper p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Reportes para la Comuna</h2>
          <p className="text-text-secondary">
            Genera reportes mensuales de materiales procesados, CO₂ ahorrado y cumplimiento de estándares.
          </p>
          <div className="mt-4 flex gap-4">
            <button className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark">
              Reporte Mensual
            </button>
            <button className="bg-tertiary text-white px-4 py-2 rounded hover:bg-tertiary-dark">
              Reporte Ambiental
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}