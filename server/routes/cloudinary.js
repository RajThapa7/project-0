const express = require('express');
const { getImageId, uploadImage } = require('../controllers/cloudinary');
const router = express.Router();

router.route('/cloudinary-images').get(getImageId).post(uploadImage);

module.exports = router; 