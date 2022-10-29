const router = require('express').Router()
const db = require("../../models");

const MainModel = db.article_categories;

const BasicCrud = require("../../helpers/classes/BasicCrud");
const controller = new BasicCrud(MainModel);

const checkBodyIsEmpty = require('../../helpers/checkBodyIsEmpty') 
const verifyToken = require('../../middlewares/verifyToken')

router.get("/", controller.get);
router.get("/:arc_id", controller.getById);
router.post("/create", verifyToken, checkBodyIsEmpty, controller.save);
// router.delete("/:arc_id", controller.delete);

module.exports = router