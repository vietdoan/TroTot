const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();
const tokenChecker = require('../../lib/tokenChecker');

router.route('/')
  .get((...args) => controller.find(...args));

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args));

module.exports = router;
