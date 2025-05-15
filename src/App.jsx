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
import CarRentalLoginScreen from './views/HomeView/mainHompage';
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
import AgentContactUsView from './views/AgentsPanelView/agentContactUsView/agentContactUsView';
import AdminDashboard from './views/AdminDashboardView/adminpanel';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import BlogManagement from './views/AdminDashboardView/BlogManagement/BlogManagement';

const isAuthenticated = false; 
const App = () => {
    React.useEffect(() => {
        // Check if user is on login page and has stored data
        if (window.location.pathname === '/' && localStorage.getItem('user')) {
            localStorage.clear(); // Clear stored data when on login page
        }
    }, []);

    return (
        <Router>
            <Routes>
                {/* User routes */}
                <Route
                    path="/home"
                    element={
                        
                            <Layout><HomeView /></Layout>
                
                    }
                />
                <Route
                    path="/home/best-cars"
                    element={
                    
                            <Layout><BestCarsView /></Layout>
        
                    }
                />
                <Route
                    path="/home/about-us"
                    element={
                        
                            <Layout><AboutUsView /></Layout>
                    }
                />
                <Route
                    path="/home/customerreviews"
                    element={
                        
                            <Layout><CustomerReviewView /></Layout>
                
                    }
                />
                <Route
                    path="/home/contactus"
                    element={
                        
                            <Layout><ContactUsView /></Layout>
                
                    }
                />
                <Route
                    path="/home/blogs"
                    element={
                    
                            <Layout><BlogsView /></Layout>
            
                    }
                />
                <Route
                    path="/home/best-cars/:id"
                    element={
                        
                            <Layout><DetailCar /></Layout>
                
                    }
                />
                <Route
                    path="/home/bookingform"
                    element={
                        <ProtectedRoute type="customer">
                            <Layout><BookingView /></Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/home/blogs/:id"
                    element={
                        
                            <Layout><BlogPost /></Layout>
            
                    }
                />

                {/* Agent routes */}
                <Route
                    path="/agent"
                    element={
                    
                            <MainLayout><AgentPanelHomeView /></MainLayout>
            
                    }
                />
                <Route
                    path="/agent/addcar"
                    element={
                        
                            <MainLayout><AddCarView /></MainLayout>
            
                    }
                />
                 <Route
                    path="/agent/addcar/:id"
                    element={
                        
                            <MainLayout><AddCarView /></MainLayout>
            
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
                        
                            <MyCarListView />
                    
                    }
                />

                <Route
                    path="/agent/contactus"
                    element={
                        <ProtectedRoute type="agent">
                            <AgentContactUsView/>
                        </ProtectedRoute>
                    }
                />

                {/* Admin routes */}
                <Route
                    path="/admin"
                    element={
                        
                            <AdminDashboard />
                    }
                />
                <Route
                    path="/admin/blogs"
                    element={
                        <BlogManagement />
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
