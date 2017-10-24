const path = require('path')

const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const router = express.Router();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(router)

app.use(express.static(path.join(__dirname, '../public')))

app.get('/test', (req, res) => res.end('hello world'))

const hostname = '127.0.0.1';
const port = process.env.PORT || 3010;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });
