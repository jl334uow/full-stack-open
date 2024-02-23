require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

morgan.token('person', function(request, response) { return JSON.stringify(request.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

const Person = require('./models/person')

app.get('/', (request, response) => {
    Person.find({}).then(persons => { response.json(persons)})
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => { response.json(persons)})
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => { response.json(person)})
})

app.get('/info', (request, response) => {
    const d = new Date()
    Person.countDocuments().then((doc_count) => response.send('<p>Phonebook has info for ' + doc_count + ' people</p>' + d.toUTCString()))
})

app.post('/api/persons', (request, response) => {
    const personRequest = request.body
    if (!personRequest.name || !personRequest.number) {
        return response.status(400).json({error: 'content missing'})
    }
    const person = new Person({
        name: personRequest.name,
        number: personRequest.number
    })
    person.save().then(savedPerson => response.json(savedPerson))
})

app.put('/api/persons/:id', (request, response, next) => {
    const personRequest = request.body
    const person = {
        name: personRequest.name,
        number: personRequest.number
    }
    Person.findByIdAndUpdate(request.params.id, person, {new:true}).then(person => {response.json(person)}).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
    
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})