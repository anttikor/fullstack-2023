const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5423523"
  },
  {
    id: 3,
    name: "Dan Ambramov",
    number: "12-34-456-7899"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "345-345671-1234"
  }
]


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`
    )
})  


app.get('/api/persons/:id', (request, response) => {
const id = Number(request.params.id)
const person = persons.find(person => person.id === id)
if (person){
    response.json(person)
}
else{
    response.status(404).end()
}

})

app.get('/api/persons', (req, res) => {
res.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
    //const maxId = persons.length > 0
    //  ? Math.max(...persons.map(n => n.id))
    //  : 0
    //return maxId + 1
    return Math.floor(Math.random() * 5000000)
}
  
app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }
  
    if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing' 
        })
    }
  
    const nameExists = persons.find(person => person.name === body.name)
    if (nameExists) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }
  
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
  })