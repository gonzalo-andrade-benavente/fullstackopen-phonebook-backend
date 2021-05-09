require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
morgan('tiny');

const Person = require('./models/person');
/* 
let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    }
  ];
 */
// MDW

const requestLogger = (req, res, next) => {
    
    const dateLog = new Date();

    console.log('Method', req.method );
    console.log('Path', req.path );
    console.log('Body', req.body );
    console.log('Time', dateLog.toString() );
    console.log('---');
    next();
}

app.use( express.json() );

app.use( cors() );

app.use( express.static('build') );

morgan.token('param', function(req, res, param) {
    return JSON.stringify(req.body);
});

//app.use(morgan('combined'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :param[id]'));

//app.use( requestLogger );

// MDW last to add.

app.get('/api/persons', (req, res) => {
    //res.json( persons );
    Person.find({}).then( persons => res.json(persons) );
});

app.get('/api/persons/:id', (req, res, next) => {
    const id = Number( req.params.id );

    Person.findById( req.params.id )
        .then( p => {
            if (p) {
                res.json(p);
            } else {
                res.status(404).end();
            }
        })
        /*
        .catch( err => {
            res.status(500).send( { err: 'malformatted id'} );
        });
        */
       .catch(error => {
            next(error);
        } );
   /*  const person = persons.find( p => p.id === id);

    if (person)  {
        res.json( person );
    } else {
        res.status(404).end();
    } */
});

app.delete('/api/persons/:id', (req, res, next) => {
    /* 
    const id = Number( req.params.id );
    persons = persons.filter( p => p.id !== id);
    res.status( 204 ).end(); */
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


app.post('/api/persons', (req, res, next) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Name/Number missing'
        });
    } 

    const exists = persons.find( p => p.name === body.name ); 
    
    if ( exists ) {
        return res.status(400).json({
            error: 'name must be unique'
        });
    }
/* 
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    } */

    const person = new Person ({
        name: body.name,
        number: body.number
    });
    
    //console.log(`added ${ result.name } number ${ result.number} to phonebook`);
    person.save()
        .then( savedPerson => savedPerson.toJSON() )
        .then( savedAndFormattedPerson => {
            persons = persons.concat( savedAndFormattedPerson );
            res.json( savedAndFormattedPerson );
        })
        .catch( error => next(error) );    

});

app.put('/api/persons/:id', (req, res, next) => {
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

app.get('/info', (req, res) => {
    

    Person.find({}).then( persons => {
        
        const personsLength = persons.length;
        const date = new Date();
        res.send(`Phonebook has info for ${ personsLength } people <br /><br /> ${ date}`);
    
    });

    
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(  unknownEndpoint );

const errorHandler = (error, req, res, next) => {

    console.log(error.message, error.name);

    if ( error.name === 'CastError') {
        return res.status(400).send( { error: 'malformatted id'} );
    } else if ( error.name === 'ValidationError' ) {
        return res.status(400).json( {error : error.message } );
    }

    next(error);
}

app.use( errorHandler );

const PORT = process.env.PORT || 3001;
app.listen( PORT , () => {
    console.log(`Server running at por ${ PORT }`);
});