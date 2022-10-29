require('dotenv').config()
const error = require('../helpers/errors')
const models = require('../models')

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const saltRounds = 10;

class UserController {
    login = (req, res) => {
        const { email, password } = req.body
        models.users.findOne({
            where: {
                user_username: email
            }, 
        }).then(function (entries) {
            let info = entries
            if (info) {
                bcrypt.compare(password, info.user_password, function (err, result) {
                    if (err) error(res)
                    else {
                        if (result) {
                            const token = jwt.sign({ uid: info.user_id, username: info.user_username }, process.env.SECRETKEY)
                            const { user_password, ...userData } = info.dataValues
                            res.send({ message: `user ${info.user_username} logged in!`, user: { ...userData }, token })
                        } else {
                            error(res, 401, { message: 'Salah password!' })
                        }
                    }
                })
            } else error(res, 401, { message: 'Email tidak ditemukan!' })
        });
    }

    register = (req, res) => {
        bcrypt.hash(req.body.password, saltRounds, function (err, hashedPassword) {
            // check if email already exist
            models.users.findOne({
                where: {
                    user_username: req.body.email
                }
            }).then(function (entries) {
                if (entries) {
                    error(res, 400, { message: 'Email sudah terdaftar!' })
                } else {
                    const user = {
                        user_phone: req.body.phone,
                        user_username: req.body.email, 
                        user_password: hashedPassword,
                        user_fullname: req.body.name,
                    };
                    models.users.create(user)
                        .then(data => {
                            res.send({ data });
                        })
                        .catch(err => {
                            error(res, 500, err)
                        });
                }
            })
        })
    }
}

module.exports = new UserController()