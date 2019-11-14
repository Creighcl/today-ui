process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


if (!process.env.CLOUD_DEPLOYED) {
  dotenv.config({ path: '.env.development' });
}

const app = express();
const publicPath = path.join(__dirname, '..', 'public');

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/show', (req, res) => {
  res.send({ constring: JSON.stringify(process.env) });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});
