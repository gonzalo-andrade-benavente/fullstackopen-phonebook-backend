const mongoose = require('mongoose');
const supertest = require('supertest');

const { initialPersons } = require('./test_helper');

const Person = require('../models/person');

beforeEach(async () => {
    await Person.deleteMany({});

    let personObject = Person(initialPersons[0]);
    await personObject.save();

    personObject = Person(initialPersons[1]);
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
    const response = await api.get('/api/persons');
    expect(response.body).toHaveLength(initialPersons.length);
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

    const res = await api.get('/api/persons');
    expect(res.body).toHaveLength(initialPersons.length);
    
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

    const res = await api.get('/api/persons');
    const numbers = res.body.map(p => p.number);

    expect(res.body).toHaveLength(initialPersons.length + 1);
    expect(numbers).toContain('+596 9681 2109');

});



afterAll(() => {
    mongoose.connection.close();
    server.close();
});

