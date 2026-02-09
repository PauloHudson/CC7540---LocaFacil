import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import Layout from './src/components/Layout';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import VehiclesScreen from './src/screens/VehiclesScreen';
import ElectronicsScreen from './src/screens/ElectronicsScreen';
import RentalDetailScreen from './src/screens/RentalDetailScreen';
import PaymentConfirmationScreen from './src/screens/PaymentConfirmationScreen';
import MyRentalsScreen from './src/screens/MyRentalsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import AdminVehiclesScreen from './src/screens/AdminVehiclesScreen';
import AdminElectronicsScreen from './src/screens/AdminElectronicsScreen';
import AdminUsersScreen from './src/screens/AdminUsersScreen';

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const { isSignedIn, user, loading } = useContext(AuthContext);

  if (loading) {
    return <SplashScreen />;
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
    return <SplashScreen />;
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
          <Route
            path="/payment-confirmation"
            element={
              <ProtectedRoute>
                <PaymentConfirmationScreen />
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
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Layout>
                  <AdminDashboardScreen />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/vehicles"
            element={
              <ProtectedRoute isAdmin={true}>
                <Layout>
                  <AdminVehiclesScreen />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/electronics"
            element={
              <ProtectedRoute isAdmin={true}>
                <Layout>
                  <AdminElectronicsScreen />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <Layout>
                  <AdminUsersScreen />
                </Layout>
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
