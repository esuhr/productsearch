const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String
	},
	ingredients: {
		required: true,
		type: []
	}
},{
	collection: 'products'
})

module.exports = mongoose.model('Product', productSchema)