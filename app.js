const express = require('express');

const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const PORT = process.env.PORT || 3000
const path = require('path');

const quoteRoutes = require('./routes/quotes');
const authRoutes = require('./routes/auth'); // authentication routes| Steven

const app = express();
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/quotes', quoteRoutes);
app.use('/auth', authRoutes); // use authentication routes | Steven

//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('swagger-jsdoc');
const swaggerEspec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Vehicle Transport Estimator API",
            version:"1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`],
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc(swaggerEspec)));

// app.use(bodyParser.urlencoded({ extended: false }));


app.get('/500', errorController.get500);
app.use(errorController.get404);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.listen(PORT, () => {
    console.info(`Transport API running on Port ${PORT}`);
})