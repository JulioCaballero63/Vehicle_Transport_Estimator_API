const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }));
app.get('/500', errorController.get500);
app.use(errorController.get404);

app.listen(PORT, () => {
    console.info(`Transport API running on Port ${PORT}`);
})