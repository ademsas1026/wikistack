const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const models = require('../models');
const router = express.Router();
const userRouter = require('./user');
const wikiRouter = require('./wiki')

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);






module.exports = router;