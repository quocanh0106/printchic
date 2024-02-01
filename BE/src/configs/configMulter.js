const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { makeDir } = require('../utils/shared');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const publicDir = path.join(__dirname, '../public/');
        makeDir(publicDir);
        const uploadDir = path.join(__dirname, '../public/uploads/');
        makeDir(uploadDir);
        const difFile = path.join(__dirname, '../public/uploads/images/');
        makeDir(difFile);
        cb(null, difFile);
    },
    filename: (req, file, cb) => {
        const PhotoCode = Math.random();
        const fileName = PhotoCode + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    },
});

const storageAttachment = multer.diskStorage({
    destination: (req, file, cb) => {
        const publicDir = path.join(__dirname, '../public/');
        makeDir(publicDir);
        const uploadDir = path.join(__dirname, '../public/uploads/');
        makeDir(uploadDir);
        const difFile = path.join(__dirname, '../public/uploads/attachments/');
        makeDir(difFile);
        cb(null, difFile);
    },
    filename: (req, file, cb) => {
        const PhotoCode = Math.random();
        const fileName = PhotoCode + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
        return cb(new Error(CODES_ERROR[40004]));
    }
    return cb(null, true);
};
const isAttachment = (string) => string.match(/\.(PNG|png|JPG|jpg|gif|jpeg|xlsx|xls|doc|docx|pdf)$/);
const fileFilterAttachment = (req, file, cb) => {
    if (!isAttachment(file.originalname)) {
        return cb(new Error(CODES_ERROR[40004]));
    }
    return cb(null, true);
};
const uploadAttachment = multer({ storage: storageAttachment, limits: { fileSize: 8000000 }, fileFilter: fileFilterAttachment }).single('file');
const upload = multer({ storage, limits: { fileSize: 8000000 }, fileFilter }).single('image');
const uploadMultipleImage = multer({
    limits: {
        fileSize: 8000000,
    },
    fileFilter,
    storage,
}).any('files');

module.exports = {
    upload,
    uploadAttachment,
    uploadMultipleImage,
}