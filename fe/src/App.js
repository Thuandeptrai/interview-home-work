import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { REGISTER_ACTIONS } from './redux/action';
import LoginPage from './pages/loginPage';
import ProtectedRoute from './routes/protectedRoute';
import HomePage from './pages/homePage';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
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
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
