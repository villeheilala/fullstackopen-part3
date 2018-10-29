const express = require('express')
const app = express()

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

app.get('/', (request, response) => {
	response.send('<p>Server running...</p>')
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
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

app.get('/info', (request, response) => {
	response.send(`<p>Database contains information about ${persons.length} persons</p>
		<p>${new Date()}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
