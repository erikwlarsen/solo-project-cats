const GifEntry = require('../save-data/postgresql-orm').GifEntry;

const GifController = {
  randomGif(req, res, next) {
    console.log('in randomGif');
    let idNum = Math.floor(Math.random()*200 + 1);
    GifEntry.findOne({
      where: { _id: idNum }
    }).then(entry => {
      console.log('findOne entry is ', entry);
      next();
      // res.type('application/json').json(entry);
    });
  }
}

module.exports = GifController;