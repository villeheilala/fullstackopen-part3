const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dbuser = ''
const dbpassword = ''

const url = `mongodb://${dbuser}:${dbpassword}@ds145463.mlab.com:45463/fullstackopen`

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
