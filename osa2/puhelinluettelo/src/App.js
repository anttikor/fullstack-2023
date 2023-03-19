import { useState, useEffect } from 'react'
import Person from './components/Phonebook'
import Notification from './components/Notification'
import noteService from './services/phonebook'


const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)  

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [persons])

  const addPerson = (event) => {
    event.preventDefault()    
  
    const isDuplicate = persons.some(person => person.name === newName)
    const oldPerson = persons.find(person => person.name === newName)    
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      const doWeAdd = window.confirm(`${newName} is already added to phonebook. Do you want to update the number?`)
      if (doWeAdd){
        noteService.update(oldPerson.id, {...oldPerson, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person =>person.id !== oldPerson.id ? person : returnedPerson))
            setNewPerson('')
            setNewNumber('')
            setErrorMessage(`'${newName}' number updated`)
            setTimeout(() => {setErrorMessage(null)}, 5000)
          })
      }      
      return
    }
  
    const personObject = {
      name: newName,
      number: newNumber,
    }
    noteService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewPerson('')
        setNewNumber('')
        setErrorMessage(`'${newName}' added to phonebook`)
        setTimeout(() => {setErrorMessage(null)}, 5000)
      })
  }

  const handleRemovePerson = (id) => {

  }
  
  {persons.map((person) => (
    <Person
      key={person.id}
      person={person}
      handleRemovePerson={() => handleRemovePerson(person.id)}
    />
  ))}
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleRemove = (personToDelete) => {
      noteService
        .remove(personToDelete.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
          console.log(`${personToDelete.name}, deleted`)
          setErrorMessage(`${personToDelete.name}, deleted`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error)
          setErrorMessage(`Failed to delete ${personToDelete.name}.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
  }

    return (
      <div>
        <Notification message={errorMessage} />
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
        
        {persons.map(person => <Person key={person.name} person={person} handleRemove={handleRemove}/>)}
      </div>
    )
  }

export default App