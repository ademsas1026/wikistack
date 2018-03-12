const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const models = require('./models')
const router = express.Router();
const indexRouter = require('./routes/index');
const bodyParser = require('body-parser')

//body-parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// point nunjucks to the directory containing templates and turn off caching; configure returns an Environment 
// instance, which we'll want to use to add Markdown support later.
const env = nunjucks.configure('views', { noCache: true });
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.get('/', (req, res) => {
    res.send('welcome to my server');
});

app.get('/home', (req, res) => {
    res.render('index');
})

app.use('/', indexRouter);

app.use(express.static('views'));

models.User.sync()
    .then(function() {
        console.log('User table created');
        return models.Page.sync();
    })
    .then(function() {
        console.log('Page table created');
        app.listen(3000, () => {
            console.log(`listening on port 3000`);
        });
    })
    .catch(console.error.bind(console));