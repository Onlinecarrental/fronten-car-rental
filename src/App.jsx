import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import './index.css';
const isAuthenticated = false; 
const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    
                </Routes>
                </Layout>
        </Router>
    );
};

export default App;
