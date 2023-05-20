const express = require('express');
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require('../controllers/contactController');
const { validateContactId, findContactById, checkContactOwnership } = require('../middleware/contactsMiddleware');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.route('/').get(getContacts).post(createContact);
router.route('/:id')
    .get(validateContactId, findContactById, getContact)
    .put(validateContactId, findContactById, checkContactOwnership, updateContact)
    .delete(validateContactId, findContactById, checkContactOwnership, deleteContact);

module.exports = router;