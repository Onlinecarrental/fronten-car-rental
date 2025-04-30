import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import './index.css';
import HomeView from './views/homeView/homeView';
import BestCarsView from './views/BestCarsView/bestCarsView';
import AboutUsView from './views/AboutUsView/aboutUsView';
import CustomerReviewView from './views/customerREviewView/customerREview';
import ContactUsView from './views/ContactUsView/contactUsView';
import BlogsView from './views/BlogsView/blogView'
import DetailCar from './views/BestCarsView/cardetailview';
import BlogPost from './views/BlogsView/showblog';
import BookingView from './views/BookingFormView/bookingFormView';
import CarRentalLoginScreen from './views/homeView/mainHompage';
import Login from './components/login';
import Signup from './components/signup';
import MainLayout from './components/mainLayout';
import AgentPanelHomeView from './views/AgentsPanelView/agentHomeView/agentHomeview';
import AddCarView from './views/AgentsPanelView/addCarView/addCarView';
const isAuthenticated = false; 
const App = () => {
    return (
        <Router>
            
                <Routes>
                <Route path="/home" element={<Layout><HomeView/></Layout>} />
                <Route path="/home/best-cars" element={<Layout><BestCarsView/> </Layout>} />
                <Route path="/home/about-us" element={<Layout><AboutUsView/> </Layout>} />
                <Route path="/home/customerreviews" element={<Layout><CustomerReviewView/> </Layout>} />
                <Route path="/home/contactus" element={<Layout><ContactUsView/> </Layout>} />
                <Route path="/home/blogs" element={<Layout><BlogsView/> </Layout>} />
                <Route path="/home/cardetail" element={<Layout><DetailCar/> </Layout>} />
                <Route path="/home/bookingform" element={<Layout><BookingView/> </Layout>} />
                <Route path="/" element={<CarRentalLoginScreen/>} />
                <Route path="/" element={<CarRentalLoginScreen/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/agent" element={<MainLayout><AgentPanelHomeView/></MainLayout>} />
                <Route path="/addcar" element={<MainLayout><AddCarView/></MainLayout>} />
                <Route path="/home/blogs/showblog" element={<Layout><BlogPost/> </Layout>} />
                </Routes>
        </Router>
    );
};

export default App;
