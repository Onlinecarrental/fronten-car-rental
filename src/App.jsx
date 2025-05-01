import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import './index.css';
import HomeView from './views/homeView/homeView';
import BestCarsView from './views/BestCarsView/bestCarsView';
import AboutUsView from './views/AboutUsView/aboutUsView';
import CustomerReviewView from './views/customerREviewView/customerREview';
import ContactUsView from './views/ContactUsView/contactUsView';
import BlogsView from './views/BlogsView/blogView';
import DetailCar from './views/BestCarsView/cardetailview';
import BlogPost from './views/BlogsView/showblog';
import BookingView from './views/BookingFormView/bookingFormView';
import CarRentalLoginScreen from './views/homeView/mainHompage';
import Login from './components/login';
import Signup from './components/signup';
import MainLayout from './components/mainLayout';
import AgentPanelHomeView from './views/AgentsPanelView/agentHomeView/agentHomeview';
import AddCarView from './views/AgentsPanelView/addCarView/addCarView';
import BookingManagementView from './views/AgentsPanelView/bookingManagementView/bookingManagementView';
import MyCarListView from './views/AgentsPanelView/myCarListView/myCarListView';
import AgentSignup from './components/AgentSignup';
import AgentLogin from './components/AgentLogin';
import ProtectedRoute from './components/ProtectedRoute';

const isAuthenticated = false; 
const App = () => {
    return (
        <Router>
            <Routes>
                {/* User routes */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute type="user">
                            <Layout><HomeView /></Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/home/best-cars"
                    element={
                        <ProtectedRoute type="user">
                            <Layout><BestCarsView /></Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/home/about-us"
                    element={
                        <ProtectedRoute type="user">
                            <Layout><AboutUsView /></Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/home/customerreviews"
                    element={
                        <ProtectedRoute type="user">
                            <Layout><CustomerReviewView /></Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/home/contactus"
                    element={
                        <ProtectedRoute type="user">
                            <Layout><ContactUsView /></Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/home/blogs"
                    element={
                        <ProtectedRoute type="user">
                            <Layout><BlogsView /></Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/home/cardetail"
                    element={
                        <ProtectedRoute type="user">
                            <Layout><DetailCar /></Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/home/bookingform"
                    element={
                        <ProtectedRoute type="user">
                            <Layout><BookingView /></Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/home/blogs/showblog"
                    element={
                        <ProtectedRoute type="user">
                            <Layout><BlogPost /></Layout>
                        </ProtectedRoute>
                    }
                />

                {/* Agent routes */}
                <Route
                    path="/agent"
                    element={
                        <ProtectedRoute type="agent">
                            <MainLayout><AgentPanelHomeView /></MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/agent/addcar"
                    element={
                        <ProtectedRoute type="agent">
                            <MainLayout><AddCarView /></MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/agent/booking-management"
                    element={
                        <ProtectedRoute type="agent">
                            <BookingManagementView />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/agent/carlist"
                    element={
                        <ProtectedRoute type="agent">
                            <MyCarListView />
                        </ProtectedRoute>
                    }
                />

                {/* Public routes */}
                <Route path="/" element={<CarRentalLoginScreen />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/agent-signup" element={<AgentSignup />} />
                <Route path="/agent-login" element={<AgentLogin />} />
            </Routes>
        </Router>
    );
};

export default App;
