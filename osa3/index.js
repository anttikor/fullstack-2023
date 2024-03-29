const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require('dotenv').config()

const Person = require('./models/person')

const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')
    next()
}

const errorHandler = (error, req, res, next) => {
    //console.log("error.name back", error.name)
    if (error.name === 'CastError') {    
      //console.log("error 1 back", error.message)
      return res.status(400).send({ error: error.message })
    } else if (error.name === 'ValidationError') {
      //console.log("error 2 back", error.message)
      return res.status(400).json({ error: error.message })
    }    
    //next(error)
  }

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))


app.use(morgan(function (tokens, req, res) {
    let feedback = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',      
    ]
    if (req.method === 'POST'){
        postData = JSON.stringify(req.body)
        feedback.push(postData)
    }    
    return feedback.join(' ')
  }))


let persons = []


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    const date = new Date()
    Person.find({}).then(persons => {
        res.send(
          `<p>Phonebook has info for ${persons.length} people</p>
          <p>${date}</p>`
        )
    })
  })  


app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

  app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons)
    })
  })

  app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(204).end()
      })
      .catch(error => next(error))
  })

  app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body
     
    const person = {
      name: body.name,
      number: body.number,
    }
    Person.findByIdAndUpdate(
      req.params.id,
      { name, number },
      { new: true, runValidators: true, context: 'query' })

    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})