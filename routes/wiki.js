const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const router = express.Router()
const models = require('../models');
const Page = models.Page;
const User = models.User;
const Sequelize = require('sequelize');
const bodyParser = require('body-parser')


//body-parsing middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res, next) => {
    // res.redirect('/');
    res.send('welcome to wiki')
});

router.post('/', function(req, res, next) {

    // STUDENT ASSIGNMENT:
    // add definitions for `title` and `content`
    console.log('this is req.body', req.body);
    const page = Page.build({
        author: req.body.author,
        'author-email': req.body['author-email'],
        title: req.body.title,
        content: req.body['page-content'],
        'page-status': req.body['page-status']

    });

    // STUDENT ASSIGNMENT:
    // make sure we only redirect *after* our save is complete!
    // note: `.save` returns a promise or it can take a callback.
    page.save()
        .then(
            res.json(page)
        )
        // res.redirect('/');
});

router.get('/add', (req, res, next) => {
    res.render('addpage');
});

router.post('/add', (req, res, next) => {
    res.json(req.body);
})



module.exports = router;