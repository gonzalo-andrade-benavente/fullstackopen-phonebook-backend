const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
morgan('tiny');

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

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
  
//app.use(  unknownEndpoint );


app.use( express.json() );

app.use( cors() );

app.use( express.static('build') );

morgan.token('param', function(req, res, param) {
    return JSON.stringify(req.body);
});

//app.use(morgan('combined'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :param[id]'));

//app.use( requestLogger );


app.get('/api/persons', (req, res) => {
    res.json( persons );
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number( req.params.id );
    const person = persons.find( p => p.id === id);

    if (person)  {
        res.json( person );
    } else {
        res.status(404).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number( req.params.id );

    persons = persons.filter( p => p.id !== id);

    res.status( 204 ).end();

});

const generateId = () => {
    //const maxId = persons.length > 0 ? Math.max( ...persons.map(person => person.id) ) : 0 ;
    const maxId = persons.length > 0 ? Math.floor((Math.random() * 100) + persons.length) : 0;
    return maxId + 1;
}


app.post('/api/persons', (req, res) => {
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

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat( person );
    res.json( person );

});

app.put('/api/persons/:id', (req, res) => {

    const id = Number( req.params.id );
    const number = req.body.number;

    persons.map( (person) => {

      if ( person.id === id) {
        person.number = number;
      }

    });

    const person = persons.find( p =>  p.id === id);

    res.json( person );

});

app.get('/info', (req, res) => {
    const personsLength = persons.length;
    const date = new Date();
    res.send(`Phonebook has info for ${ personsLength } people <br /><br /> ${ date}`);
});

const PORT = process.env.PORT || 3001;
app.listen( PORT , () => {
    console.log(`Server running at por ${ PORT }`);
});