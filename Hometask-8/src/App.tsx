import HomePage from './layouts/HomePage';
import LoginPage from "./layouts/LoginPage";
import RegisterPage from './layouts/RegisterPage';
import NewPost from './layouts/NewPost';
import StripePage from './layouts/StripePage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from "./components/Navigation";

import { useAppSelector } from './store/hooks';
// import type { RootState } from './store/store';

import { Navigate, Outlet } from "react-router-dom";
import './App.css'

interface ProtectedRouteProps {
  isAllowed: boolean;
}

function ProtectedRoute({ isAllowed }: ProtectedRouteProps) {
  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function App() {

  const isAuthenticated = useAppSelector(
    (state) => Boolean(state.user.token)
  );

  return (
    <div className="app">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}>
            <Route path='/home' element={<HomePage />} />
            <Route path='/new-post' element={<NewPost />} />
            <Route path='/' element={<StripePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
