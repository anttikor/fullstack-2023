const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log("env", url)
    console.log('error connecting to MongoDB:', error.message)
  })

  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Nimi on pakollinen tieto"],
      validate: {
        validator: function(v) {
          return v.length >= 3
        },
        message: props => `Nimen "${props.value}" pitää olla vähintään 3 kirjainta pitkä`
      }
    },
    number:{
      type: String,
      required: [true, "Numero on pakollinen tieto"],
      validate: {
        validator: v => /^\d{2,3}-\d{4,}(?!\D)$/.test(v),
        message: props => `${props.value} puhelinnumero on väärän mallinen`
      }
    }
  })

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)