import mongoose from "mongoose";

await mongoose.connect("mongodb://Padmin:Padmin@localhost");
console.log("Database connection requested");

console.log("Running DB.js");
