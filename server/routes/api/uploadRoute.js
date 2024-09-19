const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const router = require('express').Router();

// Determine the path to the "uploads" folder within the Goddess Within app directory
// const uploadsDir = path.join(__dirname, '..', '..', '..', 'uploads');

// Define the uploads directory path within the public folder of the React app
const uploadsDir = path.join(__dirname, '../../../client/public/uploads');

// Ensure the "uploads" directory exists, create it if it doesn't
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      // fieldname will be 'images'
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  }
});

const multerFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp/;
  const mimetypes = /image\/jpeg|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 } // 2MB limit
});

router.post('/', upload.array('images', 5), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No images uploaded.');
  }

  const imageSizes = [
    { name: 'thumbnail', width: 150 },
    { name: 'medium', width: 500 },
    { name: 'large', width: 1000 },
    { name: 'url', width: 1920 }
  ];

  try {
    await Promise.all(
      req.files.map(async (file) => {
        const resizePromises = imageSizes.map((size) => {
          const outputPath = path.join(
            uploadsDir,
            `${size.name}-${file.filename}`
          );
          return sharp(file.path)
            .resize({ width: size.width })
            .toFile(outputPath);
        });
        return Promise.all(resizePromises);
      })
    );

    const processedImages = req.files.map((file) => {
      const images = {};
      imageSizes.forEach((size) => {
        images[size.name] = `/uploads/${size.name}-${file.filename}`;
      });
      return images;
    });

    res.send({
      message: 'Images uploaded and processed successfully.',
      images: processedImages
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing images.');
  }
});

module.exports = router;
