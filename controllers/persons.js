const personRouter = require('express').Router();
const logger = require('../utils/logger');
const Person = require('../models/person');

personRouter.get('/', (req, res) => {
    //res.json( persons );
    Person.find({}).then( persons => res.json(persons) );
});

personRouter.get('/:id', (req, res, next) => {
    const id = Number( req.params.id );

    Person.findById( req.params.id )
        .then( p => {
            if (p) {
                res.json(p);
            } else {
                res.status(404).end();
            }
        })
       .catch(error => {
            next(error);
        } );
});

personRouter.delete('/:id', (req, res, next) => {

    Person.findByIdAndRemove(req.params.id)
        .then( result => { 
            res.status(204).json(result);
        })
        .catch( error => next(error) );

});

const generateId = () => {
    //const maxId = persons.length > 0 ? Math.max( ...persons.map(person => person.id) ) : 0 ;
    const maxId = persons.length > 0 ? Math.floor((Math.random() * 100) + persons.length) : 0;
    return maxId + 1;
}


personRouter.post('/', async (req, res, next) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name/Number missing'
        });
    } 

    //const exists = persons.find( p => p.name === body.name ); 
    const exists = await Person.find({ name: body.name }).exec();

    if ( exists.length > 0 ) {
        return res.status(400).json({
            error: 'name must be unique'
        });
    }

    const person = new Person ({
        name: body.name,
        number: body.number
    });
    
    person.save()
        .then( savedPerson => savedPerson.toJSON() )
        .then( savedAndFormattedPerson => {
            res.json( savedAndFormattedPerson );
        })
        .catch( error => next(error) );    

});

personRouter.put('/:id', (req, res, next) => {
/* 
    const id = Number( req.params.id );
    const number = req.body.number;
    persons.map( (person) => {

      if ( person.id === id) {
        person.number = number;
      }

    });
    const person = persons.find( p =>  p.id === id);
    res.json( person ); */
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate( req.params.id, person, {  new:true })
        .then( personUpdate => { res.json(personUpdate) })
        .catch( error => next(error) );

});



module.exports = personRouter;