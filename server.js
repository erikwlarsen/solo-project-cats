const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('client'));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/client/index.html'), {headers: {'Content-Type': 'text/html'}}, err => {
    if (err) console.log(err);
  });
});

app.listen(3000);