const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
          
cloudinary.config({ 
  cloud_name: 'dungpt123', 
  api_key: '665928475299984', 
  api_secret: 'xmxqBE93JoPkfwS6yU_0o9q0ob8' 
});

const storage = new CloudinaryStorage({
  cloudinary,
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
  
});

const uploadCloud = multer({ storage, limits: {   fieldSize: 25 * 1024 * 1024, fileSize: 10283775 } });

module.exports = uploadCloud;
