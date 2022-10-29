const multer = require('multer')
const path = require('path')
const fs = require('fs')

var maxSize = 5 * 1024 * 1024;

var storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        cb(null, './public/')
    },
    filename: (req, file, cb) => {
        req.FILELOCALPATH = `${file.fieldname}-${Date.now()}`+ path.extname(file.originalname)

        let allowed_file_types = ['.jpg', '.png']

        if(file && allowed_file_types.includes(path.extname(file.originalname))){
            cb(null, req.FILELOCALPATH)
            req.body.image = 'public/'+req.FILELOCALPATH
        } else {
            cb(null, req.FILELOCALPATH)
            // delete file
            let url = 'public/'+req.FILELOCALPATH
            fs.unlink(url, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        }
    },
});

module.exports = multer({ storage: storage, limits: {fileSize: maxSize} })