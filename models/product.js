const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	brand: {
		require: true,
		type: String
	},
	name: {
		required: true,
		type: String
	},
	price: {
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