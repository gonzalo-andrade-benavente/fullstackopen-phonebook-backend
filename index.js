const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
morgan('tiny');

const logger = require('./utils/logger');
const config = require('./utils/config');
const personRouter = require('./controllers/persons');
const middleware = require('./utils/middleware');

const url = config.MONGODB_URI;

logger.info('connecting to', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    });

// MDW
app.use( cors() );
app.use( express.static('build') );
app.use( express.json() );

morgan.token('param', function(req, res, param) {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :param[id]'));

app.use('/api/persons', personRouter);

app.use( middleware.unknownEndpoint );
app.use( middleware.errorHandler );

const PORT = config.PORT || 3001;
app.listen( PORT , () => {
    //console.log(`Server running at por ${ PORT }`);
    logger.info(`Server running at por ${ PORT }`);
});

module.exports = app;