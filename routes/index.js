const express = require('express');
const router = express.Router();

// GET homepage
router.get('/', (req, res) => {

  const fs = require('fs');
  const folderPath = './public/uploads/images/album1/resized';

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }

    const imagePaths = files
  .filter((file) => file.endsWith('.jpg')) // Adjust file extensions as per your images
  .map((file) => file);
    // render the homepage view
    res.render('index', { imagePaths });
  });
});

module.exports = router;