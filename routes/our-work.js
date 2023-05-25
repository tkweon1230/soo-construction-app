const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('our-work/index');
});

module.exports = router;