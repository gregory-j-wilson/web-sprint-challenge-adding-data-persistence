const express = require('express');

const router = express.Router();

const db = require('../connection')

router.post('/', (req, res) => {

    const newProject = req.body

    db('projects')
        .insert(newProject)
        .returning('id')
        .then(id => {
            res.status(200).json({data: id})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })

})



router.get('/', (req, res) => {

    db.select('*').from('projects')
        .then(projects => {
            res.status(200).json({data: projects})
        })
        .catch(error => {
            res.status(500).json({error: error.message})
        })

})


router.post('/:id/tasks', (req, res) => {

    const newTask = req.body

    db('tasks')
        .where({ id: req.params.id })
        .insert(newTask)
        .returning('id')
        .then(id => {
            res.status(200).json({data: id})
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })

})



router.get('/:id/tasks', (req, res) => {

    db.select('*').from('tasks').where({ 'tasks.project_id': req.params.id })
        .then(tasks => {
            res.status(200).json({data: tasks})
        })
        .catch(error => {
            res.status(500).json({error: error.message})
        })

})


module.exports = router;