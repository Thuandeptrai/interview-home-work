import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { REGISTER_ACTIONS } from './redux/action';
import LoginPage from './pages/loginPage';
import ProtectedRoute from './routes/protectedRoute';
import RedirectRoute from './routes/redirectedRoute';
import RegisterPage from './pages/registerPage';

import HomePage from './pages/homePage';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'

function App() {
  // register page


  return (
    <BrowserRouter>
      {/* // normal react router dom v6 */}
      <Routes>

        <Route exact path='/' element={<ProtectedRoute />}>
          <Route exact path='/' element={<HomePage />} />
        </Route>
        <Route exact path='/' element={<RedirectRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        </Route>
        {/* // redirect to home page */}
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;
