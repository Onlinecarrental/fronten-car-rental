import React, { useState, useEffect } from "react";
import axios from "axios";
import BaseCard from "../../../components/card";
import Button from "../../../components/button";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState("pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const itemsPerPage = 6;

  // Get agent from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");
        if (!user.uid) {
          setError("You must be logged in as an agent.");
          setLoading(false);
          return;
        }
        const res = await axios.get(`http://localhost:5000/api/bookings/agent/${user.uid}`);
        setBookings(res.data.data || []);
      } catch (err) {
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user.uid]);

  // Filter bookings by status
  const filteredData = bookings.filter(b => b.status === activeFilter);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const goToPage = (page) => setCurrentPage(page);
  const goToPreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const handleApprove = async (bookingId) => {
    try {
      await axios.patch(`http://localhost:5000/api/bookings/${bookingId}/approve`);
      setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: 'approved' } : b));
    } catch (err) {
      alert('Failed to approve booking.');
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await axios.patch(`http://localhost:5000/api/bookings/${bookingId}/reject`);
      setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: 'rejected' } : b));
    } catch (err) {
      alert('Failed to reject booking.');
    }
  };

  return (
    <div className="p-8 flex flex-col items-center space-y-4">
      {/* Filter buttons OUTSIDE the card */}
      <div className="flex justify-center pb-6 gap-4">
        {["pending", "approved", "rejected"].map((status) => (
          <Button
            key={status}
            title={status.charAt(0).toUpperCase() + status.slice(1)}
            bgColor={activeFilter === status ? "bg-black" : "bg-white"}
            textColor={activeFilter === status ? "text-white" : "text-black"}
            shadow={activeFilter === status ? "shadow-lg" : "shadow-none"}
            onClick={() => handleFilterChange(status)}
            width="120px"
            height="40px"
            className="rounded-full border"
          />
        ))}
      </div>

      {/* Table inside card */}
      <BaseCard width="w-full" height="h-auto" padding="p-0" className="border">
        <div className="grid grid-cols-5 bg-gray p-4 rounded-t-lg font-bold text-center">
          <div className="mr-8">Customer</div>
          <div className="mr-8">Vehicle</div>
          <div className="mr-8">Date</div>
          <div className="mr-8">Status</div>
          <div className="mr-8">Action</div>
        </div>

        <div className="p-4 space-y-4">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : currentData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No bookings found.</div>
          ) : (
            currentData.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-5 bg-gray rounded-lg p-4 items-center"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full ml-4 mr-2"></div>
                  {item.customer?.name || 'N/A'}
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-md ml-4 mr-2"></div>
                  {item.car?.name || 'N/A'}
                </div>
                <div>
                  <span className="bg-white rounded-md ml-4 px-2 py-1 text-sm">
                    {item.dateFrom ? new Date(item.dateFrom).toLocaleDateString() : ''} - {item.dateTo ? new Date(item.dateTo).toLocaleDateString() : ''}
                  </span>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : item.status === 'approved' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{item.status}</span>
                </div>
                <div className="flex gap-2">
                  {item.status === 'pending' && (
                    <>
                      <Button
                        title="Approve"
                        bgColor="bg-green-600"
                        textColor="text-white"
                        height="36px"
                        width="80px"
                        className="text-sm"
                        onClick={() => handleApprove(item._id)}
                      />
                      <Button
                        title="Reject"
                        bgColor="bg-red-600"
                        textColor="text-white"
                        height="36px"
                        width="80px"
                        className="text-sm"
                        onClick={() => handleReject(item._id)}
                      />
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </BaseCard>

      {/* Pagination OUTSIDE the card */}
      <div className="flex justify-center pt-6 gap-2">
        <button
          onClick={goToPreviousPage}
          className="bg-indigo-600 text-white rounded-lg shadow-lg h-9 w-24 text-sm font-medium"
        >
          Previous
        </button>

        {[...Array(Math.max(5, totalPages))].map((_, index) => {
          const pageNumber = index + 1;
          const isActive = currentPage === pageNumber;
          const isAvailable = pageNumber <= totalPages;

          return (
            <button
              key={index}
              onClick={() => isAvailable && goToPage(pageNumber)}
              className={`h-9 w-9 text-sm font-medium rounded-lg shadow-lg ${isActive
                  ? "bg-indigo-600 text-white"
                  : isAvailable
                    ? "bg-gray-300 text-black"
                    : "bg-gray-200 text-gray-400"
                }`}
              disabled={!isAvailable}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={goToNextPage}
          className="bg-indigo-600 text-white rounded-lg shadow-lg h-9 w-24 text-sm font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
}
