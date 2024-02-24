import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'
import DisplayContacts from './components/DisplayContacts.jsx'
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filteredName, setFilteredName] = useState('')
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.debug('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    var personCopy = {}
    if (persons.some(person => person.name === newName ? personCopy = person : false)) {
      console.log(personCopy)
      if(window.confirm(personCopy.name + 'is already added to the phonebook, replace the old number with a new one?')) {
        personService.update(personCopy.id, {name: personCopy.name, number:newNumber, id: personCopy.id})
          .then(window.location.reload())
      }
      else {
        event.preventDefault()
      }
    }
    else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService.create(personObject)
      .then(response =>{
        const personsCopy = [...persons]
        personsCopy.push(response.data)
        setPersons(personsCopy)
      })
      .catch(error => {
        setErrorMessage(String(error.response.data.message))
        setTimeout(() => setErrorMessage(null), 5000)
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
  //TODO: Fix filter
  const namesToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filteredName.toLowerCase()))

  const handleFilteredNameChange = (event) => {
    setFilteredName(event.target.value)
    setShowAll(!showAll)
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter filteredName={filteredName} handleFilteredNameChange={handleFilteredNameChange}/>

      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName}/>

      <h2>Numbers</h2>
      <DisplayContacts namesToShow={namesToShow}/>
    </div>
  )
}

export default App