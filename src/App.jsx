import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import './index.css';
import HomeView from './views/HomeView/homeView';
import BestCarsView from './views/BestCarsView/bestCarsView';
import AboutUsView from './views/AboutUsView/aboutUsView';
import CustomerReviewView from './views/customerREviewView/customerREview';
const isAuthenticated = false; 
const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                <Route path="/" element={<HomeView/>} />
                <Route path="/best-cars" element={<BestCarsView/>} />
                <Route path="/about-us" element={<AboutUsView/>} />
                <Route path="/customerreviews" element={<CustomerReviewView/>} />
                
                </Routes>
                </Layout>
        </Router>
    );
};

export default App;
