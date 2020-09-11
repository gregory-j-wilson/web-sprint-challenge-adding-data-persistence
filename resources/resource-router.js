const express = require('express');

const router = express.Router();

const db = require('../connection')



router.post('/', (req, res) => {

    const newResource = req.body

    db('resources')
        .insert(newResource)
        .returning('id')
        .then(id => {
            res.status(200).json({data: id})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })

})


router.get('/', (req, res) => {

    db.select('*').from('resources')
        .then(resources => {
            res.status(200).json({data: resources})
        })
        .catch(error => {
            res.status(500).json({error: error.message})
        })

})




module.exports = router;