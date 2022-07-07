const express = require('express')
const { getAllJobs } = require('../controllers/jobs/allJob')

const router = express.Router()


const {
  createElectricJob,
  deleteElectricJob,
  getAllElectricJobs,
  updateElectricJob,
  getElectricJob,
} = require('../controllers/jobs/electric')

const {
  createPlumberJob,
  deletePlumberJob,
  getAllPlumberJobs,
  updatePlumberJob,
  getPlumberJob,
} = require('../controllers/jobs/plumber')

const {
  createTankJob,
  deleteTankJob,
  getAllTankJobs,
  updateTankJob,
  getTankJob,
} = require('../controllers/jobs/tank')

router.route("/").get(getAllJobs);
router.route('/electric').post(createElectricJob).get(getAllElectricJobs)
router.route('/electric/:id').get(getElectricJob).patch(updateElectricJob).delete(deleteElectricJob)
router.route('/plumber').post(createPlumberJob).get(getAllPlumberJobs)
router.route('/plumber/:id').get(getPlumberJob).patch(updatePlumberJob).delete(deletePlumberJob)
router.route('/tank').post(createTankJob).get(getAllTankJobs)
router.route('/tank/:id').get(getTankJob).patch(updateTankJob).delete(deleteTankJob)

module.exports = router
  