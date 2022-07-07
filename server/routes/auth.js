const express = require('express');
const router = express.Router();
const {registerClient, registerTechnician, loginClient, loginTechnician, refreshToken} = require('../controllers/auth')
const wrapper = require('../errorWrapper')


router.post('/register_client', wrapper(registerClient))
router.post('/register_technician', wrapper(registerTechnician))
router.post('/login_client', wrapper(loginClient))
router.post('/login_technician', wrapper(loginClient))
router.post('/refresh', wrapper(loginClient))

module.exports = router; 