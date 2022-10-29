require('dotenv').config()
const error = require('../errors')

class BasicCrud {
    constructor(model){
        this.Model = model
        this.getPK().then(pk => {
            this.pk = pk[0]
        })
    }

    get = (req, res) => { 
        let where = {}
        const {size, page, ...search} = req.query
        const limit = size ? size : undefined
        const offset = page ? (page * size) - 1 : undefined

        if(search.search) where = {
            ar_title : search.search
        }

        this.Model.findAll({
            include: req.includes,
            where, limit, offset
        }).then(async datas => {
            const totalRows = await this.Model.count()
            res.send({data:datas, limit, offset, totalRows})
        }).catch(err => {
            error(res, 400, err)
        });
    }  

    searchById = async (data) => {
        const response = await this.Model.findOne({
            where: {
                [this.pk]: data[this.pk]
            }
        })
        return response
    }
    
    getById = (req, res) => {
        this.searchById(req.params).then(data => {
            res.send(data)
        }).catch(err => {
            error(res, 400, err)
        });
    }

    save = async (req, res, next) => { 
        const data = req.body 
        if(!data[this.pk])
        this.Model.create(data)
            .then(data => { 
                res.send({ data });
            })
            .catch(err => {
                error(res, 500, err)
            });
        else { 
            const item = await this.searchById(data) 
            const upres = await item.update(data)
            res.send({ data: upres }); 
        }
    }

    delete = async (req, res) => {
        const data = req.params 
        const item = await this.searchById(data) 
        const upres = await item.destroy(data)
        res.send({ data: upres });  
    }

    // Custom Func
    getPK = async () => {
        const schema = await this.Model.describe()
        return Promise.all(Object.keys(schema).filter(function(field){
            return schema[field].primaryKey;
        }))
    }
}

module.exports = BasicCrud