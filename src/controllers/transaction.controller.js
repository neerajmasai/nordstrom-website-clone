//TRANSACTION CONTROLLER

//create a router
const { request } = require("express");
const express = require("express");
const router = express.Router();

//models
const Transaction = require("../models/transaction.model.js");

//Http Verbs will come here GET, GET by id, POST, PATCH, DELETE

// post transaction to the database 

router.post("/", async function (req, res) {
    try {
        const post = await Transaction.create(req.body);
        return res.status(201).send(post);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});

// get all transactions from database

router.get("/", async function (req, res) {
    try {
        const get = await Transaction.find().lean().exec();
        return res.status(200).send(get);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});

// get transaction by Id

router.get("/:id", async function (req, res) {
    try {
        const getById = await Transaction.findById().lean().exec();
        return res.status(200).send(getById);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});


// Update the products in the database

router.patch("/:id", async function (req, res) {
    try {
        const update = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(update);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});

// delete the Transaction from the database

router.delete("/:id", async function(req, res) {
    try {
        const remove = await Transaction.findByIdAndDelete(req.params.id);
        return res.status(204).send(remove);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});

//get all transactions of a user
router.get("/user/:id", async function (req, res) {
    try {
        const transactions = await Transaction.find({user: req.params.id}).lean().exec();
        return res.status(200).send(transactions);
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
});

//export
module.exports = router;
