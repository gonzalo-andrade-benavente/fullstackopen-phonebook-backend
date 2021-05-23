const mongoose = require('mongoose');
const supertest = require('supertest');

const Person = require('../models/person');

const initialPersons = [
    { name: 'name test 1', number: '+569 9680 2109' },
    { name: 'name test 2', number: '+569 2109 9680' }
];


beforeEach(async () => {
    await Person.deleteMany({});

    let personObject = Person(initialPersons[0]);
    await personObject.save();

    personObject = Person(initialPersons[1]);
    await personObject.save();
});

const app = require('../index');

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


afterAll(() => {
    mongoose.connection.close();
});

