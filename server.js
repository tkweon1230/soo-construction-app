if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))


const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const sourceDir = './public/uploads/images/album1';
const targetDir = './public/uploads/images/album1/resized';
const width = 350;
const height = 350;

// Create the target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

// Read the files in the source directory
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Process each file
  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    // Resize the image
    sharp(sourcePath)
      .rotate()
      .resize(width, height)
      .toFile(targetPath, (resizeErr) => {
        if (resizeErr) {
          console.error('Error resizing image:', resizeErr);
          return;
        }
        console.log('Image resized:', file);
      });
  });
});


const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log('Connected to DB'))

const indexRouter = require('./routes/index')
const contactRouter = require('./routes/contact')
const galleryRouter = require('./routes/gallery')
const homeAdditionGalleryRouter = require('./routes/home-addition-gallery')
const repairsGalleryRouter = require('./routes/repairs-gallery')
const roofingGalleryRouter = require('./routes/roofing-gallery')

app.use('/', indexRouter)
app.use('/contact', contactRouter)
app.use('/gallery', galleryRouter)
app.use('/home-addition-gallery', homeAdditionGalleryRouter)
app.use('/repairs-gallery', repairsGalleryRouter)
app.use('/roofing-gallery', roofingGalleryRouter)

// app.listen(process.env.PORT || 3000)
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});