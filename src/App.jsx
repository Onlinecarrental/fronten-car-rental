import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import './index.css';
import HomeView from './views/HomeView/homeView';
import BestCarsView from './views/BestCarsView/bestCarsView';
import AboutUsView from './views/AboutUsView/aboutUsView';
import CustomerReviewView from './views/customerREviewView/customerREview';
import ContactUsView from './views/ContactUsView/contactUsView';
import BlogsView from './views/BlogsView/blogView'
import DetailCar from './views/BestCarsView/cardetailview';
import BlogPost from './views/BlogsView/showblog';
import BookingView from './views/BookingFormView/bookingView';

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
                <Route path="/contactus" element={<ContactUsView/>} />
                <Route path="/blogs" element={<BlogsView/>} />
                <Route path="/cardetail" element={<DetailCar/>} />
                <Route path="/bookingform" element={<BookingView/>} />
                
                <Route path="/blogs/showblog" element={<BlogPost/>} />
                </Routes>
                </Layout>
        </Router>
    );
};

export default App;
