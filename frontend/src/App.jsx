import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ContactForm from './Component/ContactForm';
import ContactsList from './Component/ContactsList';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 text-white shadow mb-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">📇 Contact Book</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Add Contact</Link>
            <Link to="/contacts" className="hover:underline">Contacts List</Link>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="max-w-4xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<ContactForm />} />
          <Route path="/contacts" element={<ContactsList />} />
        </Routes>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
    </BrowserRouter>
  );
}

export default App;
