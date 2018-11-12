const bearerToken = require('express-bearer-token');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(bearerToken());
app.use(bodyParser.json({}));

app.use('/v1', require('v1/routes'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = app;
