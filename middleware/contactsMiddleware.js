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
  
  module.exports = { findContactById, validateContactId };
  

