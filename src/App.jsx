import React from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Watch from './Pages/Watch/Watch';
import AdminPage from './Pages/Admin/Admin';
import Login from './Pages/Login/Login';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/watch/:id"
                    element={
                        <PrivateRoute>
                            <Watch />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute>
                            <AdminPage />
                        </PrivateRoute>
                    }
                />
               {/* Add the Logout route */}
            </Routes>
        </Router>
    );
}

export default App;
