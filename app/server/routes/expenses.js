const express = require('express')
const router = express.Router()
const knex = require('../db')

router.get('/', (req, res, next) => {
  knex('expenses')
    .then(expenses => res.json(expenses))
    .catch(err => next(err))
})

module.exports = router