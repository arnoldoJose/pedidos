const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const key = require('./Config/Key');
const Cors = require('cors');
require('./Config/config');

app.use(Cors())

mongoose.connect(key.key, {useNewUrlParser: true,useCreateIndex: true,}
  ,(err) => {
    if (!err) {
      console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
  });
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: true}
  }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/public", express.static(`${__dirname}/Upload`));


app.use(require('./Routes/Routes'))

app.listen(process.env.PORT, () =>
  console.log(`server on line port:${process.env.PORT}`)
);