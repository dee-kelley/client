const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todos = new Schema(
    {id: Number,
    message: String}
);

module.exports = mongoose.model("Data", Todos);