
const router = require('express').Router() 

router.use('/auth', require('./users')) 
router.use('/article', require('./articles'))  
router.use('/article-category', require('./article_categories'))  

module.exports = router