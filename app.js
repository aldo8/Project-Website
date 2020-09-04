const express = require('express');
const path = require('path');
var cors = require('cors');

const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8080);