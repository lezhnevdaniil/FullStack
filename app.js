const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./src/modules/routes/routes');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8000;
app.use(bodyParser.json());
app.use(cors());
app.use('/', apiRoutes);

const url = 'mongodb+srv://lezhnevdaniil:Lezhnev_123@lezhnevdaniil.umqjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});