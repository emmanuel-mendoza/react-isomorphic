import express from 'express';
import { getAll, post, update, remove, filename, delayme } from '../data/data-manager';

const router = express.Router();

const getData = (req, res) => {
  console.log('Server is processing GET request: ', req.body);
  getAll(filename, delayme)
    .then((val) => res.json(val))
    .catch((err) => res.status(500).end(`Internal server error\n\n${err.message}`));
};

const postData = (req, res) => {
  console.log('Server is processing POST request: ', req.body);
  post(filename, req.body, delayme)
    .then((val) => res.json(val))
    .catch((err) => res.status(500).end(`Internal server error\n\n${err.message}`));
};

const updateData = (req, res) => {
  console.log('Server is processing PUT request: ', req.body);
  update(filename, req.body.data, req.body.id, delayme)
    .then((val) => res.json(val))
    .catch((err) => res.status(500).end(`Internal server error\n\n${err.message}`));
};

const deleteData = (req, res) => {
  console.log('Server is processing DELETE request: ', req.body);
  remove(filename, req.body.id, delayme)
    .then((val) => res.json(val))
    .catch((err) => res.status(500).end(`Internal server error\n\n${err.message}`));
};

// Order matters when matching paths
router.get('/api', getData);
router.post('/api', postData);
router.put('/api', updateData);
router.delete('/api', deleteData);

export default router;
