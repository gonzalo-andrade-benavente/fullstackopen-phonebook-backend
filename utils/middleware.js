const logger = require('./logger');

const requestLogger = (req, res, next) => {
    
    const dateLog = new Date();

    logger.info('Method', req.method );
    logger.info('Path', req.path );
    logger.info('Body', req.body );
    logger.info('Time', dateLog.toString() );
    logger.info('---');
    next();
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {

    logger.error(error.message, error.name);

    if ( error.name === 'CastError') {
        return res.status(400).send( { error: 'malformatted id'} );
    } else if ( error.name === 'ValidationError' ) {
        return res.status(400).json( {error : error.message } );
    }

    next(error);
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}