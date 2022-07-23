import React from 'react';
import './App.css';
import Navbar from './partials/Navbar';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './partials/Layout';


function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Explore/>} />
            <Route path="/offers" element={<Offers/>} />
            <Route path="/profile" element={<SignIn/>} />
            <Route path="/sig-in" element={<SignIn/>} />
            <Route path="/sign-up" element={<SignUp/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
          </Routes>
        </Layout>
        
        
        {/* Navbar */}
        <Navbar />
      </Router>
    </>
  );
}

export default App;
