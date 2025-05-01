const express = require('express');
const Contact = require('../components/Contact');
const router = express.Router();

// Create a new contact
router.post('/createContact', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

  
    const existingContact = await Contact.findOne({ $or: [{ email }, { phone }] });
    if (existingContact) {
      return res.status(400).json({ message: 'Contact with this email or phone already exists.' });
    }

    const newContact = new Contact({ name, email, phone });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create contact' });
  }
});


router.put('/updateContact/:id', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const contactId = req.params.id;

    const updatedContact = await Contact.findByIdAndUpdate(contactId, { name, email, phone }, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(updatedContact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update contact' });
  }
});


router.get('/', async (req, res) => {
  try {
    const { search, favorite } = req.query;
    const filter = {};

    if (favorite) {
      filter.is_favorite = true;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const contacts = await Contact.find(filter);
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
});


router.put('/contacts/:id/favorite', async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.is_favorite = !contact.is_favorite;
    await contact.save();

    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update favorite status' });
  }
});

module.exports = router;
