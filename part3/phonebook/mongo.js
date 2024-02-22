const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give db password and name/number to add to contacts')
  process.exit(1)
}

const password = process.argv[2]

const url =
  "mongodb+srv://bill:"+ password +"@cluster0.5bavldj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('phonebook:\n')
    Person.find().then(result=> {
        result.forEach(person => {
            console.log(person.name + ' ' + person.number)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
    const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
    })

    person.save().then(result => {
    console.log('added ' + person.name + ' number ' + person.number + ' to phonebook')
    mongoose.connection.close()
    })
}