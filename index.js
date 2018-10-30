const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(bodyParser.json())
morgan.token('data', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))
app.use(express.static('build'))

let persons = [
	{
		name: "Arto Hellas",
		phone: "040-123456",
		id: 1
	},
	{
		name: "Martti Tienari",
		phone: "040-123456",
		id: 2
	},
	{
		name: "Arto Järvinen",
		phone: "040-123456",
		id: 3
	},
	{
		name: "Lea Kutvonen",
		phone: "040-123456",
		id: 4
	}
]

//const formatPerson = (person) => {
//	const formattedPerson = {...person._doc, id: person._id}
//	delete formattedPerson._id
//	delete formattedPerson.__v
//	return formattedPerson
//}

app.get('/', (request, response) => {
	response.send('<p>Server running...</p>')
})

// endpoin for getting all persons
app.get('/api/persons', (request, response) => {
	Person
		.find({}, {__v: 0})
		.then(persons => {
			response.json(persons.map(Person.format))
		})
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)

	if ( person ) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

const generateId = () => {
	const maxId = persons.length > 0 ? persons.map(person => person.id).sort((a, b) => a - b).reverse()[0] : 1
	return maxId + 1
}

app.post('/api/persons/', (request, response) => {
	const body = request.body
	
	if (body.name === undefined || body.phone === undefined) {
		return response.status(400).json({error: 'body content missing'})
	}

	//if (persons.some(person => person.name === body.name)) {
	//	return response.status(400).json({error: `person ${body.name} already exists`})
	//}

	const person = new Person({
		name: body.name,
		phone: body.phone,
	})

	person
		.save()
		.then(savedPerson => {
			response.json(Person.format(savedPerson))
		})

})

app.get('/info', (request, response) => {
	response.send(`<p>Database contains information about ${persons.length} persons</p>
		<p>${new Date()}</p>`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
