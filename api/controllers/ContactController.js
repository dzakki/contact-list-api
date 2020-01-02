const { Contact } = require('../models')

class ContactController {
    static getAll(req, res) {
        Contact
        .findAll({
            order: [['id', 'desc']]
        })
        .then(contacts => {
            res.status(200).jsonp({
                status: 'success',
                contacts
            })
        })
        .catch(errs => {
            res.status(422).jsonp({
                status: 'failed',
                errs
            })
        })
               
    }
    static getOne(req, res) {
        Contact
        .findOne({
            where: req.params
        })
        .then(contact => {
            res.status(200).jsonp({
                status: 'success',
                contact
            })
        })
        .catch(errs => {
            res.status(422).jsonp({
                status: 'failed',
                errs
            })
        })
    }

    static update(req, res) {
        const form = req.body
        const where = {
            where: req.params
        }
        Contact
        .update(form, where)
        .then(contact => {
            res.status(200).jsonp({
                status: 'success',
                contact
            })
        })
        .catch(errs => {
            res.status(422).jsonp({
                status: 'failed',
                errs
            })
        })
    }
    static insert(req, res) {
        const form = req.body

        Contact
        .create(form)
        .then(contact => {
            res.status(200).jsonp({
                status: 'success',
                contact
            })
            // res.send(contact)
        })
        .catch(errs => {
            // res.send(errs)
            res.status(422).jsonp({
                status: 'failed',
                errs
            })
        })
    }

    static delete(req, res) {
        Contact
        .destroy({
            where: req.params
        })
        .then(contact => {
            res.status(200).jsonp({
                status: 'success',
                contact
            })
        })
        .catch(errs => {
            res.status(422).jsonp({
                status: 'failed',
                errs
            })
        })
    }
}

module.exports = ContactController