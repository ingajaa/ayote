'use strict';

const router = require('./router');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(
  cors({
    origin: '*'
  })
);
app.use(express.json());
app.use(router);

app.listen(process.env.SERVER_PORT, () => console.log(`Listening on http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`));
