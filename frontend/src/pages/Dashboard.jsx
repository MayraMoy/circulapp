// frontend/src/pages/Dashboard.jsx
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

// Componentes específicos por rol
import DashboardUsuario from './DashboardUsuario';
import DashboardGestor from './DashboardGestor';
import DashboardCoordinador from './DashboardCoordinador';
import DashboardAdmin from './DashboardAdmin';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirigir si no hay usuario
  if (!user) {
    navigate('/login');
    return null;
  }

  // Renderizar dashboard según el rol
  switch (user.role) {
    case 'user':
      return <DashboardUsuario />;
    case 'gestor':
      return <DashboardGestor />;
    case 'coordinador':
      return <DashboardCoordinador />;
    case 'admin':
      return <DashboardAdmin />;
    default:
      return (
        <Layout>
          <div className="max-w-4xl mx-auto py-12 text-center">
            <p className="text-text-secondary">No se encontró un panel para tu rol.</p>
          </div>
        </Layout>
      );
  }
}