const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const user = new Schema({
    username: { type : String, unique: true },
    password: String,
    email: {type: String, unique: true },
    name: String,
})

const todo = new Schema({
    title : String,
    description: String,
    done: Boolean,
    userID: ObjectId
});


const userModel = mongoose.model('users', user);
const todoModel = mongoose.model('todos', todo);

module.exports = {
    userModel: userModel,
    todoModel: todoModel
}