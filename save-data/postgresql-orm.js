const Sequelize = require('sequelize');
const request = require('request');
const API_URL = 'https://api.giphy.com/v1/gifs/search?api_key=MW5czB76HwkBu7TtxFZ4brmlICTLCLNA&q=cat&limit=200&offset=0&rating=G&lang=en'

const sequelize = new Sequelize('solo_db', 'eriklarsen', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

const GifEntry = sequelize.define('gifEntry', {
  _id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  id: Sequelize.STRING,
  imageLink: Sequelize.STRING,
  smallImageLink: Sequelize.STRING,
  smallFixedImageLink: Sequelize.STRING,
  counter: { type: Sequelize.INTEGER, defaultValue: 0 },
  createdAt: { type: Sequelize.DATE },
  tags: Sequelize.STRING
});

const Update = sequelize.define('update', {
  _id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  lastUpdate: Sequelize.DATE
});

const getTags = (data) => {
  return data.split(' ');
}

const migrate = (data) => {
  sequelize.sync({ force: false }).then(() => {
    data.data.forEach(entry => {
      GifEntry.findOrCreate({ where: { id:entry.id },
        id: entry.id,
        imageLink: entry.images.fixed_width.url,
        smallImageLink: entry.images.fixed_width_small.url,
        smallFixedImageLink: entry.images.fixed_width_small_still.url,
        counter: 0,
        createdAt: new Date(Date.now()),
        tags: JSON.stringify(getTags(entry.title))
      });
    });
    Update.create({
      lastUpdate: new Date(Date.now())
    })
  });
}

request(API_URL, (err, resp) => {
  let data = JSON.parse(resp.body);
  migrate(data);
});

module.exports = { GifEntry, Update, sequelize }