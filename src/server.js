import path from 'path';
import url from 'url';
import express from 'express';
import hbs from 'hbs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
console.log(__filename);

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

const app = express();

app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);

const name = 'Created by Khursheed Alam Khan';

hbs.registerPartials(partialsDirectoryPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App Web Server',
    description: 'A weather app web server that uses NodeJS/Express',
    name,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    image:
      'https://images.unsplash.com/photo-1486707471592-8e7eb7e36f78?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1094',
    description:
      'The weather app provides data about current weather for a specified city',
    name,
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    description:
      'Type the name of the city to fetch the current weather data in the input field at home page!',
    name,
  });
});

app.get('/weather', (req, res) => {
  res.send({
    forcast: 'cloudy',
    location: 'hawaii',
  });
});

app.get('/help/{*splat}', (req, res) => {
  res.status(404).render('404', {
    title: 'Error 404 Page',
    error: 'Help Article not found!',
    name,
  });
});

app.get('/about/{*splat}', (req, res) => {
  res.status(404).render('404', {
    title: 'Error 404 Page',
    error: 'About Article not found!',
    name,
  });
});

app.get('/{*splat}', (req, res) => {
  res.status(404).render('404', {
    title: 'Error 404 Page',
    error: 'Article not found!',
    name,
  });
});

app.listen('3000', () => {
  console.log('server is on port 3000');
});
