const mongoose = require("mongoose");
const {Electric} = require("../../models/job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const createElectricJob = async (req, res) => {
  req.body.createdBy = req.client.userId;
  const job = await Electric.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllElectricJobs = async (req, res) => {
  const jobs = await Electric.find({ createdBy: req.client.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
 

const getElectricJob = async (req, res) => {
  const {
    client: { userId },
    params: { id: jobId },
  } = req;

  const job = await Electric.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({job});
};


const updateElectricJob = async (req, res) => {
  const {
      body: {status, description, location, image},
    client: { userId },
    params: { id: jobId },
  } = req;

  if (status === "" || description === "" || location === "" || image === "" ) {
    throw new BadRequestError("All fields cannot be empty");
  }

  const job = await Electric.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );



 
  res.status(StatusCodes.OK).json({ msg: "updated success"});
};

const deleteElectricJob = async (req, res) => {
  try {
    const {
      client: { userId },
      params: { id: jobId },
    } = req;
    const job = await Electric.findByIdAndRemove({
      _id: jobId,
      createdBy: userId,
    });
    if (!job) {
      throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).send(` Electric job with id ${jobId} deleted`);
  } catch (error) {
    console.log(error);
  }
};



module.exports = {
  createElectricJob,
  deleteElectricJob,
  getAllElectricJobs,
  updateElectricJob,
  getElectricJob,
};
