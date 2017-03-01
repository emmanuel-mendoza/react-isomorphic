import express from 'express';

const router = express.Router();
const logger = (req, res, next) => {
  console.log('Request type: ', req.method);
  console.log('Request URL: ', req.url);
  console.log('Request path: ', req.path);
  next();
};

router.use(logger);

export default router;