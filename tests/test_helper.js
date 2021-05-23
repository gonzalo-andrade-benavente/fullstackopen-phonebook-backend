const person = require('../models/person');
const Person = require('../models/person');

const initialPersons = [
    { name: 'name test 1', number: '+569 9680 2109' },
    { name: 'name test 2', number: '+569 2109 9680' }
];

const nonExistingId = async () => {

    const person = new Person( { name:'personremovethissoon', number:'+569 9680 2109'  } );
    await person.save();
    await person.remove();

    return person._id.toString();
}

const personsInBd = async () => {
    const persons = await Person.find({});
    return persons.map( person => person.toJSON() );
} 

module.exports = {
    initialPersons
    , nonExistingId
    , personsInBd
}