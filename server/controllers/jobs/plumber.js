const {Plumber} = require("../../models/job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors");

const createPlumberJob = async (req, res) => {
  req.body.createdBy = req.client.userId;
  const job = await Plumber.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ job });
};

const getAllPlumberJobs = async (req, res) => {
  const jobs = await Plumber.find({ createdBy: req.client.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
 

const getPlumberJob = async (req, res) => {
  const {
    client: { userId },
    params: { id: jobId },
  } = req;

  const job = await Plumber.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};


const updatePlumberJob = async (req, res) => {
  const {
      body: {status, description, location, image},
    client: { userId },
    params: { id: jobId },
  } = req;

  if (status === "" || description === "" || location === "" || image === "" ) {
    throw new BadRequestError("All fields cannot be empty");
  }

  const job = await Plumber.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    {...req.body},
    { new: true, runValidators: true }
  );



 
  res.status(StatusCodes.OK).json({ msg: "updated success"});
};

const deletePlumberJob = async (req, res) => {
  try {
    const {
      client: { userId },
      params: { id: jobId },
    } = req;
    const job = await Plumber.findByIdAndRemove({
      _id: jobId,
      createdBy: userId,
    });
    if (!job) {
      throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).send(` PLUMBER job with id ${jobId} deleted`);
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  createPlumberJob,
  deletePlumberJob,
  getAllPlumberJobs,
  updatePlumberJob,
  getPlumberJob,
};
