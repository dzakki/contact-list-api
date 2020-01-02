const express = require('express')
const router = express.Router()

const ContactController = require('../controllers/ContactController')

router.get('/', ContactController.getAll)
router.post('/', ContactController.insert)
router.get('/:id', ContactController.getOne)
router.put('/:id', ContactController.update)
router.delete('/:id', ContactController.delete)

module.exports = router