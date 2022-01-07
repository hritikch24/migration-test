const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    feedback:{
        type: String,
        required: true
    }
},{timestamps: true})

const Feedbacks = mongoose.model('Feedbacks', feedbackSchema)

module.exports = Feedbacks