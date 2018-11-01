const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(bodyParser.json())
morgan.token('data', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))
app.use(express.static('build'))

/*let persons = [
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
]*/

/*const formatPerson = (person) => {
	const formattedPerson = {...person._doc, id: person._id}
	delete formattedPerson._id
	delete formattedPerson.__v
	return formattedPerson
}*/

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
	Person
		.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(Person.format(person))
			} else {
				response.status(404).end()
			}
		})
		.catch(error => {
			console.log(error)
			response.status(400).send({ error: "malformatted id" })
		})
})

app.put('/api/persons/:id', (request, response) => {
	const body = request.body

	if (body.phone === undefined) {
		return response.status(400).json({error: 'body content missing'})
	}

	Person
		.findByIdAndUpdate(request.params.id, { phone: body.phone }, { new: true })
		.then(updatedPerson => {
			response.json(Person.format(updatedPerson))
		})
		.catch(error => {
			console.log(error)
			reponse.status(400).send({ error: "malformatted id" })
		})
})

app.delete('/api/persons/:id', (request, response) => {
	Person
		.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => {
			response.status(400).send({ error: "malformatted id" })
		})
})

//const generateId = () => {
//	const maxId = persons.length > 0 ? persons.map(person => person.id).sort((a, b) => a - b).reverse()[0] : 1
//	return maxId + 1
//}

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

	Person
		.find({ name: body.name })
		.then(result => {
			if (result.length) { throw new Error() }
			return person.save()
		}).then(savedPerson => {
			response.json(Person.format(savedPerson))
		}).catch(err => {
			return response.status(409).send({ error: "Conflict: Duplicate entity" })
		})

})

app.get('/info', (request, response) => {
	Person
		.estimatedDocumentCount()
		.then(count => {
			response.send(`<p>Database contains information about ${count} persons</p>
			<p>${new Date()}</p>`)
		})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
