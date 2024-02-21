const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/', (request, response) => {
    response.json(persons)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => {return person.id === id})
    person ? response.json(person) : response.status(404).end()
})

app.get('/info', (request, response) => {
    const d = new Date()
    response.send('<p>Phonebook has info for ' + persons.length + ' people</p>' + d.toUTCString())
})

app.post('/api/persons', (request, response) => {
    const personRequest = request.body
    if (!personRequest.name || !personRequest.number) {
        return response.status(400).json({error: 'content missing'})
    }
    else if (persons.find(person => person.name === personRequest.name)) {
        return response.status(400).json({error: 'name must be unique'})
    }
    const person = {
        name: personRequest.name,
        number: personRequest.number,
        id: Math.floor(Math.random() * 9999)
    }
    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    person = persons.filter(person => person.id !== id)
    response.status(204).end()
    
})

const PORT = 3001
app.listen(PORT)
console.log('Server running on port ' + PORT)