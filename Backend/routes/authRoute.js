
const express = require('express');
const router =  express.Router();

const { fetchAll, fetchOne, create, update, Delete, Marked } = require('../controllers/TaskController');

// RestAPI's

router.get('/Tasks', fetchAll); // Sab kuch ayga

router.post('/Tasks', create, fetchAll); // create hoga

router.put('/Tasks/:id', update) // update hoga single item

router.delete('/Tasks/:id', Delete) // delete hoga single item

router.get('/Tasks/:id', fetchOne ) // fetch single item

router.patch('/Tasks/:id', Marked) // mark as done or pending


module.exports = router 