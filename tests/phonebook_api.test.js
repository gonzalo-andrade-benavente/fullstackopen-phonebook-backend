const mongoose = require('mongoose');
const supertest = require('supertest');

const helper = require('./test_helper');

const Person = require('../models/person');

beforeEach(async () => {
    await Person.deleteMany({});

    let personObject = Person(helper.initialPersons[0]);
    await personObject.save();

    personObject = Person(helper.initialPersons[1]);
    await personObject.save();
});

const { app, server } = require('../index');

const api = supertest(app);

test('persons are returnes as json', async () => {
    await api
        .get('/api/persons')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('there are two notes', async () => {
    const personsAtEnd = await helper.personsInBd();
    // const res = await api.get('/api/persons');
    expect(personsAtEnd).toHaveLength(helper.initialPersons.length);
    //expect(res.body).toHaveLength(helper.initialPersons.length);
});


test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/persons');
    const numbers = response.body.map(r => r.number);
    expect(numbers).toContain('+569 9680 2109');
});

test('Person without number is not added', async () => {
    const newPerson = {
        name: 'Person Test 3'
    }

    await api   
        .post('/api/persons')
        .send(newPerson)
        .expect(400);

    const personsAtEnd = await helper.personsInBd();
    expect(personsAtEnd).toHaveLength(helper.initialPersons.length);
    
});

test('a valid person can be added', async () => {

    const newPerson = {
        name: 'Person Test 3',
        number: '+596 9681 2109'
    }

    await api
        .post('/api/persons')
        .send(newPerson)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    const personsAtEnd = await helper.personsInBd();
    expect(personsAtEnd).toHaveLength(helper.initialPersons.length + 1);

    const numbers = personsAtEnd.map(p => p.number);
    expect(numbers).toContain('+596 9681 2109');

});



afterAll(() => {
    mongoose.connection.close();
    server.close();
});

