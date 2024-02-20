import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'
import DisplayContacts from './components/DisplayContacts.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filteredName, setFilteredName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert('${newName} is already added to the phonebook')
    }
    else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService.create(personObject).then(response =>{
        const personsCopy = [...persons]
        personsCopy.push(response.data)
        setPersons(personsCopy)
      })

      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const namesToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filteredName.toLowerCase()))

  const handleFilteredNameChange = (event) => {
    setFilteredName(event.target.value)
    setShowAll(!showAll)
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <Filter filteredName={filteredName} handleFilteredNameChange={handleFilteredNameChange}/>

      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName}/>

      <h2>Numbers</h2>
      <DisplayContacts namesToShow={namesToShow}/>
    </div>
  )
}

export default App