import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import { UserAuth } from './context/ContextProvider';

const App = () => {
  const { user } = UserAuth();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* ✅ Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
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

        {/* ✅ Redirect logged-in users away from auth pages */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!user ? <Signup /> : <Navigate to="/" replace />}
        />

        {/* 🚫 Catch-all 404 */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center h-screen text-center">
              <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
              <p className="text-gray-500 mb-4">
                The page you’re looking for doesn’t exist.
              </p>
              <a href="/" className="text-blue-500 hover:underline">
                Go back home
              </a>
            </div>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
