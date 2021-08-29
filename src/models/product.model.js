//PRODUCT MODEL

const mongoose = require("mongoose");
const { Schema } = mongoose;

//product schema
const productSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    disc: { type: String, required: true },
    offValue: { type: Number, required: true },
    desc1: { type: String, required: true },
    desc2: { type: String, required: false },
    ratings: { type: Number, required: true },
    zoomImg: { type: String, required: true },
    img1: { type: String, required: false },
    img2: { type: String, required: false },
    img3: { type: String, required: false },
    img4: { type: String, required: false },
    colorsImg: { type: String, required: false },
}, {timestamps: false, versionKey: false});

//creating model for product
const Product = mongoose.model("Product", productSchema);

//export
module.exports = Product;