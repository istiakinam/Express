const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars');
const children = require('./Children')
const logger = require('./middleware/logger');

const app = express();

//init middleware
//app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage ruote. After using handlebars
app.get('/', (req, res) => {
    res.render('index', {
        title: "Another Children page",
        children
    });
}) 

//set static folder
app.use(express.static(path.join(__dirname, 'files')));

//Children API Routes
app.use('/api/children', require('./routes/api/children'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server at: ${PORT}`));