const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');


const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id })
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    res.status(201).json({ message: "Created contact.", contact });
});


const getContact = asyncHandler(async (req, res) => {
    //get contact middleware 
    const contact = req.contact;

    res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
    //get contact middleware 
    const contact = req.contact;

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(201).json({ message: 'Updated contact', updatedContact });
});

const deleteContact = asyncHandler(async (req, res) => {
    //get contact middleware 
    const contact = req.contact;

    await Contact.findByIdAndRemove(req.params.id);
    res.status(200).json(contact);
});


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };