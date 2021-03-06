const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Data = new Schema(
    {id: Number,
    text: String,
    completed: Boolean}
);

module.exports = mongoose.model("Data", Data);