// frontend/App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MeetingsPage from './pages/MeetingPage/MeetingsPage';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Navigation from './components/Navigation/Navigation';
import TodoPage from './pages/TodoPage/TodoPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage.js'; // Import RegisterPage
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.js'; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <div className="App">
        {/* Place Navigation at the top */}
        <Navigation />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Protect these routes */}
          <Route path="/meetings" element={<ProtectedRoute element={<MeetingsPage />} />} />
          <Route path="/todo" element={<ProtectedRoute element={<TodoPage />} />} />
          
          {/* Login and Register are public pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> {/* Register Route */}
          
          {/* Handle 404 pages */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
