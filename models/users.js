const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: Object,
        required: true
    },
    isAdmin:{
        type: Boolean,
    }
},{timestamps: true})

const Users = mongoose.model('Users', usersSchema)

module.exports = Users