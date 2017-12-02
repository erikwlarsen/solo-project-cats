const express = require('express');
const fs = require('fs');
const path = require('path');
const GifController = require('./controllers/GifController');
const bodyparser = require('body-parser');
const app = express();

// console.log('RANDOM GIF IS ', GifController.randomGif())

app.use(express.static('client'));
app.use(bodyparser.json());

app.get('/gif', GifController.randomGif);

app.post('/plus', GifController.increment);

app.get('/list', GifController.gifList);

// app.get('/', GifController.randomGif); // testing that randomGif function works.

// probably don't need below
// app.get('/', (req, res) => {
//   res.status(200).sendFile(path.join(__dirname + '/client/index.html'), {headers: {'Content-Type': 'text/html'}}, err => {
//     if (err) console.log(err);
//   });
// });

app.listen(3000);