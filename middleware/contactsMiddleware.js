const Contact = require('../models/contactModel');
const mongoose = require('mongoose');

const findContactById = async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    return next(new Error("Contact not found"));
  }

  req.contact = contact; // Attach the found contact to the request object
  next(); // Call the next middleware or route handler
};

const validateContactId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid contact ID');
  }
  next();
};

const checkContactOwnership = (req, res, next) => {
  const contact = req.contact;

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You can't modify this contact");
  }

  next();
};

module.exports = { findContactById, validateContactId, checkContactOwnership };


