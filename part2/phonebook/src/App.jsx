import { useState } from 'react'

const Contact = ({person}) => {
  return(
    <>{person.name} {person.number}<br/></>
  )
}
const App = () => {
  const [persons, setPersons] = useState([{name: 'Arto Hellas', number: '123 456 789'}])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filteredName, setFilteredName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert('${newName} is already added to the phonebook')
    }
    else{
    const personsCopy = [...persons]
    personsCopy.push({name: newName, number: newNumber})
    setPersons(personsCopy)

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
      <input value={filteredName} onChange={handleFilteredNameChange}/>

      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {namesToShow.map(person => <Contact key={person.name} person={person}/>)}
    </div>
  )
}

export default App