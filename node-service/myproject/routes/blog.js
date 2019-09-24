var express = require('express');
var router = express.Router();
const blogCntrl = require('../controllers/blog.controller');

/* Create a new blog. */
router.post('/blogs', function (req, res, next) {
  console.log('Create a new blog.');
  return blogCntrl.create(req, res, next);
});
/* Retrive all blog. */
router.get('/blogs', function (req, res, next) {
  console.log('Retrive all blog.');
  return blogCntrl.findAll(req, res, next);
});
/*Retrieve a single blog.*/
router.get('/blogs/:blogId', function (req, res, next) {
  console.log('Retrieve a single blog.');
  return blogCntrl.findOne(req, res, next);
});
/* UPDATE blog.*/
router.put('/blogs/:blogId', function (req, res, next) {
  console.log('UPDATE blog.');
  return blogCntrl.update(req, res, next);
});
/* DELETE blog. */
router.delete('/blogs/:blogId', function (req, res, next) {
  console.log('DELETE blog.');
  return blogCntrl.delete(req, res, next);
});
module.exports = router;
