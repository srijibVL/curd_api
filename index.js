const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config.js');

const app = express();

const port = process.env.PORT || 4000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//database connection
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
      console.log("Successfully connected to the database");
    }).catch(err => {
      console.log('Could not connect to the database.', err);
     // process.exit();
    });



   app.get('/', (req, res) => {
    res.json({"message": "Hello World"});
  });

  var userRoutes = require('./routes.js')
  app.use('/api/users', userRoutes)

  app.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
  });