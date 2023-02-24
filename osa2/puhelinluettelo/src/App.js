import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Phonebook'

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    // varmaan vois tehdä järkevämminkin,
    // mutta haluan että jos annetussa arvossa on isoja kirjamia
    // ei niitä muuteta pieniksi ennen kuin vertailussa
    // eli varoituksen newName arvo on sellaisessa muodossa kuin käyttäjä on syöttänyt
    // eslint-disable-next-line 
    const isDuplicate = persons.some(person => person.name === newName)    
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
      return
    }
  
    const personObject = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

    return (
      <div>
        <h1>Phonebook</h1>  

        <form onSubmit={addPerson}>

          <div>
            <label htmlFor="newNameInput">Name: </label>
            <input value={newName} onChange={handleNameChange}/>
          </div>

          <div>
            <label htmlFor="newNumberInput">Number: </label>
            <input value={newNumber} onChange={handleNumberChange}/>
          </div>

          <div><button type="submit">add</button></div>

        </form>

        <h1>Numbers</h1>
        
        {persons.map(person => <Person key={person.name} person={person} />)}
      </div>
    )
  }

export default App