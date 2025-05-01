import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const fetchContacts = () => {
    axios.get("http://localhost:3001/api")
      .then(result => {
        const contactsWithDefaults = result.data.map(c => ({
          ...c,
          is_favorite: !!c.is_favorite,
        }));
        setContacts(contactsWithDefaults);
      })
      .catch(err => {
        console.log(err);
        toast.error("Failed to fetch contacts");
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const toggleFavorite = async (id) => {
    try {
      const updatedContact = await axios.put(`http://localhost:3001/api/contacts/${id}/favorite`);
      const newFavoriteStatus = updatedContact.data.is_favorite;

      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact._id === id ? { ...contact, is_favorite: newFavoriteStatus } : contact
        )
      );

      if (newFavoriteStatus) {
        toast.success('Contact added to favorites!');
      } else {
        toast.success('Contact removed from favorites!');
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to toggle favorite status");
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const searchTerm = search.toLowerCase();
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm) ||
      contact.phone.toString().toLowerCase().includes(searchTerm);

    const matchesFavorite = favoritesOnly ? contact.is_favorite === true : true;
    return matchesSearch && matchesFavorite;
  });

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 bg-gradient-to-br from-blue-50 to-white min-h-screen rounded-xl shadow-md">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">📇 Contact Book</h1>
        <p className="text-gray-500">Manage your contacts and favorites easily</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border border-blue-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-md transition duration-200"
        />
        <button
          onClick={() => setFavoritesOnly(!favoritesOnly)}
          className={`px-5 py-2.5 rounded-xl text-white font-medium transition duration-200 shadow-md ${
            favoritesOnly ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {favoritesOnly ? 'Show All Contacts' : 'Show Favorites'}
        </button>
      </div>

      {/* Contact Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div
              key={contact._id}
              className={`flex flex-col justify-between h-full p-5 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition duration-200 ${
                contact.is_favorite ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-gray-800">{contact.name}</h3>
                <p className="text-sm text-gray-600">📧 {contact.email}</p>
                <p className="text-sm text-gray-600">📱 {contact.phone}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => toggleFavorite(contact._id)}
                  className="text-3xl transition duration-150 hover:scale-110"
                  title={contact.is_favorite ? 'Unmark Favorite' : 'Mark Favorite'}
                >
                  {contact.is_favorite ? '⭐' : '☆'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg col-span-full">No contacts found.</p>
        )}
      </div>
    </div>
  );
};

export default ContactList;
