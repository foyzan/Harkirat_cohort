const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://admin:O2EhdPpdN7jM8UYa@cluster0.m6nlwln.mongodb.net/fullstacktodo")

const todoSchema = mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
})


const todo = mongoose.model('todos', todoSchema)

module.exports = {
    todo
}