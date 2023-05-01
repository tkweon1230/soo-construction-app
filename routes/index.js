const express = require('express');
const router = express.Router();

// GET homepage
router.get('/', (req, res) => {
  // render the homepage view
  res.render('index');
});

module.exports = router;