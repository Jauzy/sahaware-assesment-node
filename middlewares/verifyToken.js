require("dotenv").config()
const jwt = require("jsonwebtoken")
const models = require("../models");

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")
        if (token?.[0] == "Bearer") {
            jwt.verify(token[1], process.env.SECRETKEY, function (err, decoded) {
                if (err) console.log(err)
                else { 
                    req.user = {
                        username: decoded.username,
                        uid: decoded.uid,
                    }

                    models.users.findOne({
                        where: {
                            user_username: decoded.username,
                            user_id: decoded.uid,
                        }
                    }).then(user => {
                        if(user) next()
                        else res.status(401).send({ message: "User tidak ditemukan!" })
                    })
                }
            });
        } else {
            res.status(400).send({ message: "Invalid Token" })
        }
    } catch(err) {
        res.status(400).send({ message: err.message })
    }
}

module.exports = verifyToken