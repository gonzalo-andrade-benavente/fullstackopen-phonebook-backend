const mongoose = require('mongoose');

const user = 'fullstackopen'; 
const db = 'phonebook';

if ( process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://${user}:${password}@cluster0.skhs1.mongodb.net/${db}?retryWrites=true&w=majority`;

mongoose.connect(
    url,
    { 
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false,
        useCreateIndex:true
    }
);
 

const personSchema = new mongoose.Schema({
    name: String,
    number: String
}, { collection : 'person'} );

const Person = mongoose.model('Person', personSchema);

if ( process.argv.length === 3) {
    Person
        .find({})
        .then( persons => {
           console.log('phonebook:');
           persons.map( p => {
               console.log(`${p.name} ${p.number}`);
           });

           mongoose.connection.close();
        });

}

if ( process.argv.length === 5 ) {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    });
    
    person.save().then( result => {
        console.log(`added ${ result.name } number ${ result.number} to phonebook`);
        mongoose.connection.close();
    });

}



