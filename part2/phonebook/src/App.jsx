import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{name: 'Arto Hellas'}])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(newName + ' is already added to the phonebook')
    }
    else{
    console.log('Name added', event.target, newName)
    const personsCopy = [...persons]
    personsCopy.push({name: newName})
    setPersons(personsCopy)
    setNewName('')      
    }

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <>{person.name}<br/></>)}
    </div>
  )
}

export default App