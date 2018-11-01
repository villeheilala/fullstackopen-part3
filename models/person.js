const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const url = process.env.MONGODB_URI

const Schema = mongoose.Schema

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new Schema({
	name: String,
	phone: String
})

personSchema.statics.format = function(person) {
	const formattedPerson = {...person._doc, id: person._id}
	delete formattedPerson._id
	delete formattedPerson.__v
	return formattedPerson
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person
