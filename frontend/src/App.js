// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/DashboardUsuario';
import PublishItem from './pages/PublishItem';
import SearchItems from './pages/SearchItems';
import Educational from './pages/Educational';
import ValidateMaterial from './pages/ValidateMaterial';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import ItemDetail from './pages/ItemDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publish"
            element={
              <ProtectedRoute>
                <PublishItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchItems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/educational"
            element={
              <ProtectedRoute>
                <Educational />
              </ProtectedRoute>
            }
          />
          <Route
            path="/validate"
            element={
              <ProtectedRoute allowedRoles={['gestor']}>
                <ValidateMaterial />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items/:id"
            element={
              <ProtectedRoute>
                <ItemDetail />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to={localStorage.getItem('token') ? '/dashboard' : '/login'} replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;