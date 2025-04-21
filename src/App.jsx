import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import './index.css';
import HomeView from './views/homeView/homeView';
import BestCarsView from './views/BestCarsView/bestCarsView';
const isAuthenticated = false; 
const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                <Route path="/" element={<HomeView/>} />
                <Route path="/best-cars" element={<BestCarsView/>} />
                
                </Routes>
                </Layout>
        </Router>
    );
};

export default App;
