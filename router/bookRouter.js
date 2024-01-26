const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Successful - GET',
    metaData: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

router.get('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Successful - GET by Id',
    metaData: {
      id: req.params.id,
      hostname: req.hostname,
      method: req.method,
    },
  });
});

router.post('/', (req, res, next) => {
  const { name } = req.body;
  res.status(201).json({
    message: 'Successful - Post',
    metaData: {
      name: name,
      hostname: req.hostname,
      method: req.method,
    },
  });
});

router.put('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Successful - PUT by Id',
    metaData: {
      id: req.params.id,
      hostname: req.hostname,
      method: req.method,
    },
  });
});

router.delete('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Successful - DELETE by Id',
    metaData: {
      id: req.params.id,
      hostname: req.hostname,
      method: req.method,
    },
  });
});

module.exports = router;
