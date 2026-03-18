import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext.jsx';
import Layout from './components/Layout.jsx';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import VehiclesScreen from './screens/VehiclesScreen';
import ElectronicsScreen from './screens/ElectronicsScreen';
import RentalDetailScreen from './screens/RentalDetailScreen';

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const { isSignedIn, user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && !user?.is_admin) {
    return <Navigate to="/vehicles" replace />;
  }

  return children;
};

const Routes_App = () => {
  const { isSignedIn, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Routes>
      {!isSignedIn ? (
        <>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route
            path="/vehicles"
            element={
              <ProtectedRoute>
                <Layout>
                  <VehiclesScreen />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/electronics"
            element={
              <ProtectedRoute>
                <Layout>
                  <ElectronicsScreen />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/rental/:type"
            element={
              <ProtectedRoute>
                <RentalDetailScreen />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/vehicles" replace />} />
          <Route path="*" element={<Navigate to="/vehicles" replace />} />
        </>
      )}
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes_App />
      </Router>
    </AuthProvider>
  );
}

export default App;
