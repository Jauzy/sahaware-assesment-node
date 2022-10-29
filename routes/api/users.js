const router = require('express').Router()
// const db = require("../../models");

// const MainModel = db.users;

// const BasicCrud = require("../../helpers/classes/BasicCrud");
// const controller = new BasicCrud(MainModel);

const controller = require('../../controllers/UserController')

const checkBodyIsEmpty = require('../../helpers/checkBodyIsEmpty') 

// router.get("/", controller.get);
// router.get("/:user_id", controller.getById);
// router.post("/", checkBodyIsEmpty, controller.save);
// router.delete("/:user_id", controller.delete);

router.post('/register', checkBodyIsEmpty, controller.register )
router.post('/login', checkBodyIsEmpty, controller.login )

module.exports = router