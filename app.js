const express = require('express');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const ejs = require('ejs');
const { urlencoded, json } = require('express');
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//template engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);
app.post('/photos', photoController.createPhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);

app.listen(port, () => {
  console.log(`OUR SSEVER IS STARTING ${port}`);
});
