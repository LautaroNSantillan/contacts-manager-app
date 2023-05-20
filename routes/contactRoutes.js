const express = require('express');
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require('../controllers/contactController');
const { validateContactId, findContactById } = require('../middleware/contactsMiddleware');


router.route('/').get(getContacts).post(createContact);

router.route('/:id').get(validateContactId,findContactById, getContact).put(validateContactId,findContactById, updateContact).delete(validateContactId, findContactById, deleteContact);

module.exports = router;