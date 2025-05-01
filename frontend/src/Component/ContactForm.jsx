import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = ({ initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [phone, setPhone] = useState(initialData?.phone || '');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setPhone(initialData.phone);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (initialData?.id) {
        // Update existing contact
        await axios.put(`http://localhost:3001/api/updateContact/${initialData.id}`, {
          name,
          email,
          phone,
        });
        toast.success("Contact updated successfully");
      } else {
        // Create new contact
        await axios.post('http://localhost:3001/api/createContact', {
          name,
          email,
          phone,
        });
        toast.success("Contact added successfully");
        // Clear form after adding
        setName('');
        setEmail('');
        setPhone('');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow rounded max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold text-center">
        {initialData?.id ? 'Update Contact' : 'Add New Contact'}
      </h2>

      <input
        name="name"
        placeholder="Name"
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        name="phone"
        placeholder="Phone"
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        {initialData?.id ? 'Update' : 'Add'} Contact
      </button>
    </form>
  );
};

export default ContactForm;
