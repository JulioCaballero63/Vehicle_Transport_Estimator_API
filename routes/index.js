const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.use('/', (
    docData = (req, res) => {
        let docData = {
        documentationURL: '', //falta url
    };
    res.send(docData);
    })
);

module.exports = routes;