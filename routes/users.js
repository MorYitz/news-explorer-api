const router = require('express')
  .Router(); // creating a router
const {
  getUser,
} = require('../controllers/users');

router.get('/me', getUser);

module.exports = router; // exporting the router
