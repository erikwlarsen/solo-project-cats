const GifEntry = require('../save-data/postgresql-orm').GifEntry;
const sequelize = require('../save-data/postgresql-orm').sequelize;

const randomGif = (req, res, next) => {
  let idNum = Math.floor(Math.random()*200 + 1);
  GifEntry.findOne({
    where: { _id: idNum }
  }).then(entry => {
    res.json(entry.dataValues.imageLink);
  });
}

const increment = (req, res, next) => {
  GifEntry.update(
    { counter: sequelize.literal('counter + 1') },
    { where: { imageLink: req.body.gifLink } }
  ).then(data => {
    res.json(data);
  });
}

const gifList = (req, res, next) => {
  GifEntry.findAll({
    limit: 10,
    order: [['counter', 'DESC']]
  }).then(data => {
    res.json(data);
  })
}

module.exports = { randomGif, increment, gifList }