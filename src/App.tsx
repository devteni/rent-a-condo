import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Navbar from './partials/Navbar';
import Layout from './partials/Layout';
import { privateRoutes, publicRoutes } from './routes';

function App() {
  return (
    <>
      <Router>
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route element={<Layout />}>
              {publicRoutes.map((route, i) => {
                return (
                  <Route
                    key={i}
                    path={route.path}
                    element={route.element}
                  />
                );
              })}
            </Route>

            {/* PRIVATE ROUTES */}
            <Route element={<Layout />}>
              {privateRoutes.map((route, i) => {
                return (
                  <Route
                    key={i}
                    path={route.path}
                    element={route.element}
                  />
                );
              })}
            </Route>

          </Routes>  

        {/* Navbar */}
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
