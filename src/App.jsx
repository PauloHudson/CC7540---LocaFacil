import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext.jsx';
import Layout from './components/Layout.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import VehiclesScreen from './screens/VehiclesScreen';
import ElectronicsScreen from './screens/ElectronicsScreen';
import RentalDetailScreen from './screens/RentalDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PaymentConfirmationScreen from './screens/PaymentConfirmationScreen';
import MyRentalsScreen from './screens/MyRentalsScreen';
import AdminVehiclesScreen from './screens/AdminVehiclesScreen';
import AdminElectronicsScreen from './screens/AdminElectronicsScreen';
import AdminUsersScreen from './screens/AdminUsersScreen';

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const { isSignedIn, user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen message="Carregando autorização..." />;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && !user?.is_admin) {
    return <Navigate to="/vehicles" replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const { isSignedIn, user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen message="Carregando autorização..." />;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.is_admin) {
    return <Navigate to="/vehicles" replace />;
  }

  return children;
};

const Routes_App = () => {
  const { isSignedIn, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen message="Carregando aplicação..." />;
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
                <Layout>
                  <RentalDetailScreen />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Layout>
                  <PaymentMethodScreen />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-confirmation"
            element={
              <ProtectedRoute>
                <Layout>
                  <PaymentConfirmationScreen />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-rentals"
            element={
              <ProtectedRoute>
                <Layout>
                  <MyRentalsScreen />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProfileScreen />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/vehicles"
            element={
              <AdminRoute>
                <Layout>
                  <AdminVehiclesScreen />
                </Layout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/electronics"
            element={
              <AdminRoute>
                <Layout>
                  <AdminElectronicsScreen />
                </Layout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <Layout>
                  <AdminUsersScreen />
                </Layout>
              </AdminRoute>
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
