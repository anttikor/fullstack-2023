const mongoose = require('mongoose')
const password = process.argv[2]

const url =
`mongodb+srv://akortelainen:${password}@cluster0.4kbtslg.mongodb.net/puhelinluetteloDB?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    })

    const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3){
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)

        })
        mongoose.connection.close()
    })
}
else if (process.argv.length === 5){

    const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    })

    person.save().then(result => {
    console.log("added " ,person.name, person.number, " to phonebook")
    mongoose.connection.close()
    })
} else {
    console.log("Virheellinen syöte!")
    console.log('Lukeaksesi tietokannan sisällön anna komentoriviparametrit muodossa "node mongo.js <yourpassword>"')
    console.log('Kirjoittaaksesi uuden henkilön anna komentoriviparametrit muodossa "node mongo.js <yourpassword> <name> <number>" ')
    process.exit(1)
}

