import { useState, useEffect } from 'react'
import Person from './components/Phonebook'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'


const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)  

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
  
    const oldPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
  
    if (persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())) {
      const doWeAdd = window.confirm(
        `${newName} is already added to phonebook. Do you want to update the number?`
      )
      if (doWeAdd) {
        phonebookService
        .update(oldPerson.id, { ...oldPerson, number: newNumber })
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) => (person.id !== updatedPerson.id ? person : updatedPerson))
          )
          setNewPerson('')
          setNewNumber('')
          setErrorMessage(`'${updatedPerson.name}' number updated`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
      return
    }
    
    const personObject = {
      name: newName,
      number: newNumber,
    }
  
    phonebookService
      .create(personObject)
      .then(() => {
        phonebookService.getAll().then((updatedPersons) => {
          setPersons(updatedPersons)
          setNewPerson('')
          setNewNumber('')
          setErrorMessage(`'${personObject.name}' added to phonebook`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      })
      .catch((error) => {
        setErrorMessage(`${error.response.data.error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  
 
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleRemove = (personToDelete) => {
      phonebookService
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