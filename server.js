const express = require('express');
const fs = require('fs');
const path = require('path');
const GifController = require('./controllers/GifController');
const bodyparser = require('body-parser');
const app = express();

app.use(express.static('client'));
app.use(bodyparser.json());

app.get('/gif', GifController.randomGif);

app.post('/plus', GifController.increment);

app.get('/list', GifController.gifList);

app.listen(3000);