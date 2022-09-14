import React from 'react';
import './App.css';
import './index.css';
import ProjectsPage from './projects/ProjectsPage';
import ProjectPage from './projects/ProjectPage';
import { Provider } from 'react-redux';
import { store } from './state';

import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';
import HomePage from './home/HomePage'
import Register from './login/Register';
import Reset from './login/Reset';
import Login from './login/Login';
import Dashboard from './login/Dashboard';


function AppHome() {
  return (
    <Provider store={store}>
        <Router>
          <div className="container">
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectPage />} />
              <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </Router>
        </Provider>
      );
  };

export default AppHome;
