import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CustomerBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Get logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem('user')) || {};

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                setError('');
                if (!user.uid) {
                    setError('You must be logged in to view your bookings.');
                    setLoading(false);
                    return;
                }
                const res = await axios.get(`http://localhost:5000/api/bookings/customer/${user.uid}`);
                setBookings(res.data.data || []);
            } catch (err) {
                setError('Failed to load bookings.');
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [user.uid]);

    if (loading) return <div className="text-center py-10">Loading bookings...</div>;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">My Bookings</h2>
            {bookings.length === 0 ? (
                <div className="text-center text-gray-500">No bookings found.</div>
            ) : (
                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <div className="font-semibold text-lg">{booking.car?.name} ({booking.car?.model})</div>
                                    <div className="text-sm text-gray-600">From: {new Date(booking.dateFrom).toLocaleDateString()} To: {new Date(booking.dateTo).toLocaleDateString()}</div>
                                    <div className="text-sm text-gray-600">Location: {booking.location}</div>
                                    <div className="text-sm text-gray-600">Price: ${booking.price}</div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${booking.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : booking.status === 'approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{booking.status}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs ${booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>{booking.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 