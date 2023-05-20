const asyncHanlder = require('express-async-handler');
const Contact = require('../models/contactModel');
const mongoose = require('mongoose');
const { findContactById } = require('../middleware/contactsMiddleware');


const getContacts = asyncHanlder(async (req, res) => {
    const contacts = await Contact.find()
    res.status(200).json(contacts);
});

const createContact = asyncHanlder(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const contact = await Contact.create({
        name,
        email,
        phone
    });

    res.status(201).json({ message: "Created contact.", contact });
});

const getContact = asyncHanlder(async (req, res) => {
    //get contact middleware 
    const contact = req.contact;

    res.status(200).json(contact);
});

const updateContact = asyncHanlder(async (req, res) => {
    //get contact middleware 
    const contact = req.contact;

    const updatedContact =  await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true}
        );

    res.status(201).json({ message: 'Updated contact', updatedContact });
});

const deleteContact = asyncHanlder(async (req, res) => {
    //get contact middleware 
    const contact = req.contact;

    await Contact.findByIdAndRemove(req.params.id);
    res.status(200).json(contact);
});



module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };