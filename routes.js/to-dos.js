const express = require('express');
const router = express.Router()
const {Todo, validate} = require('../models/to-do');

router.get('/', async (req, res) => {
    const todo = await Todo.find().sort('-title');
    res.status(200).send(todo);
  })

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let todo = new Todo({ 
    title: req.body.title,
    description: req.body.description,
    timestamp: new Date()
})
  
  await todo.save(todo);
  res.status(200).send(todo);
})

router.get('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
  
    if (!todo) return res.status(400).send('The todo with the given ID was not found.');
  
    res.status(200).send(todo);
})

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.findOneAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description
  }, {new: true});
 if (!todo) return res.status(400).send('the todo with the given ID is not found');

  res.status(200).send(todo);
})

router.delete('/:id', async (req, res) => {
  const todo = await Todo.findOneAndRemove(req.params.id);

  if (!todo) return res.status(400).send('the todo with the given ID is not found');

  res.status(200).send(todo);
})

module.exports = router;