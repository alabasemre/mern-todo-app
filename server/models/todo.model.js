const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    todo: {
        type: String,
        required: [true, "Please add a text value"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Todos", TodoSchema);
