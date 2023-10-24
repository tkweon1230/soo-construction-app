const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const fs = require('fs');
  const folderPath = './public/uploads/images/roofing-images';

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }

  const imagePaths = files
  .filter((file) => file.endsWith('.jpg'))
  .map((file) => file);

    res.render('roofing-gallery/index', { imagePaths });
  });
});

module.exports = router; 