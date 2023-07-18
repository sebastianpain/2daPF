const mongoose = require('mongoose');
const { paginate } = require('mongoose-paginate-v2');


const PizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true,
        enum:['small', 'medium', 'large']
    },
    quantity: {
        type: Number
    },
    date:Date
});

mongoose.plugin(mongoPaginate)

const Pizza = mongoose.model('Pizza', PizzaSchema);

module.exports = Pizza;