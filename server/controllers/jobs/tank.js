const mongoose = require("mongoose");
const {Tank} = require("../../models/job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const createTankJob = async (req, res) => {
  req.body.createdBy = req.client.userId;
  const job = await Tank.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllTankJobs = async (req, res) => {
  const jobs = await Tank.find({ createdBy: req.client.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
 

const getTankJob = async (req, res) => {
  const {
    client: { userId },
    params: { id: jobId },
  } = req;

  const job = await Tank.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};


const updateTankJob = async (req, res) => {
  const {
      body: {status, description, location, image},
    client: { userId },
    params: { id: jobId },
  } = req;

  if (status === "" || description === "" || location === "" || image === "" ) {
    throw new BadRequestError("All fields cannot be empty");
  }

  const job = await Tank.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    {...req.body},
    { new: true, runValidators: true }
  );



 
  res.status(StatusCodes.OK).json({ msg: "updated success"});
};

const deleteTankJob = async (req, res) => {
  try {
    const {
      client: { userId },
      params: { id: jobId },
    } = req;
    const job = await Tank.findByIdAndRemove({
      _id: jobId,
      createdBy: userId,
    });
    if (!job) {
      throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).send(` Tank job with id ${jobId} deleted`);
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  createTankJob,
  deleteTankJob,
  getAllTankJobs,
  updateTankJob,
  getTankJob,
};
