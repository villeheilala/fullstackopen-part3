const mongoose = require('mongoose')

const dbuser = ''
const dbpassword = ''

const url = `mongodb://${dbuser}:${dbpassword}@ds145463.mlab.com:45463/fullstackopen`

mongoose.connect(url, { useNewUrlParser: true })

const Person = mongoose.model('Person', {
	name: String,
	phone: String
})

const name = process.argv[2]
const phone = process.argv[3]

if (name && phone) {

	const person = new Person({
		name,
		phone
	})

	person
		.save()
		.then(response => {
			console.log(`Added person ${name} and phone ${phone} to database.`)
			mongoose.connection.close()
		})
} else {

	Person
		.find({})
		.then(result => {
			console.log('phonebook')
			result.forEach(person => {
				console.log(`${person.name} ${person.phone}`)
			})
			mongoose.connection.close()
		})
}
