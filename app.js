const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;
const cors = require('cors');
const apiRoutes = require('./src/modules/routes/routes');
app.use(bodyParser.json());
app.use(cors());
app.use('/', apiRoutes)

const url = 'mongodb+srv://lezhnevdaniil:Lezhnev_123@lezhnevdaniil.umqjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(url, { useUnifiedTopology: true });

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});