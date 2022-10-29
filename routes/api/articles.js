const router = require('express').Router()
const db = require("../../models");

const MainModel = db.articles;

const BasicCrud = require("../../helpers/classes/BasicCrud");
const controller = new BasicCrud(MainModel);

const checkBodyIsEmpty = require('../../helpers/checkBodyIsEmpty') 
const verifyToken = require('../../middlewares/verifyToken')
const upload = require('../../config/multer.config')
const error = require('../../helpers/errors')

router.get("/", (req,res,next) =>{
    req.includes = [
        { model: db.article_categories },
    ]
    next()
}, controller.get);

router.get("/:ar_id", controller.getById);
router.post("/create", verifyToken, checkBodyIsEmpty, upload.single('image'), (req,res,next) => {
    if(!req.body.image) error(res, 400, {message: 'Image is required or file type not valid!'})
    else {
        req.body.ar_user_id = req.user.uid
        next()
    }
}, controller.save);
// router.delete("/:ar_id", controller.delete);

module.exports = router