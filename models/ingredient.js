const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
	condition: {
		required: true,
		type: String
	},
	ingredients: {
		required: true,
		type: []
	}
}, {
	collection: 'ingredients'
});

module.exports = mongoose.model('Ingredient', ingredientSchema)