// backend/models/Product.js
import mongoose from "mongoose";


const SuitabilitySchema = new mongoose.Schema({
scalpTypes: [String],
hairTypes: [String],
concerns: [String],
}, { _id: false });


const ProductSchema = new mongoose.Schema({
name: { type: String, required: true },
category: String,
price: Number,
ingredients: [String],
suitability: { type: SuitabilitySchema, default: {} },
notes: String,
link: String,
}, { timestamps: true });


export default mongoose.model("Product", ProductSchema);