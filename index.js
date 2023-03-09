const express = require('express');
const path = require('path')
const logger = require('./middleware/logger');

const app = express();

//init middleware
//app.use(logger);

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, 'files')));

//Children API Routes
app.use('/api/children', require('./routes/api/children'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server at: ${PORT}`));