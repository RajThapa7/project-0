const mongoose = require("mongoose");
const {Plumber} = require("../../models/job");
const {Electric} =require("../../models/job");
const {Tank} = require("../../models/job");
const { StatusCodes } = require("http-status-codes");


const getAllJobs = async (req, res)=>{
    const plumber = await Plumber.find({ createdBy: req.client.userId }).sort(
        "createdAt"
      );
      const electric = await Electric.find({ createdBy: req.client.userId }).sort(
        "createdAt"
      );
      const tank = await Tank.find({ createdBy: req.client.userId }).sort(
        "createdAt"
      );

      let count = plumber.length + electric.length + tank.length;
      res.status(StatusCodes.OK).json({ plumberJob: plumber, electricJob: electric, tankJob: tank, count: count });

}


const deleteAllJobs = async (req, res)=>{
    try {
        const {
          client: { userId },
        } = req;
        const electricJob = await Electric.findByIdAndRemove({
          createdBy: userId,
        });
        const plumberJob = await Plumber.findByIdAndRemove({
            createdBy: userId,
          });
          const tankJob = await Tank.findByIdAndRemove({
            createdBy: userId,
          });
        if (!electricJob || !plumberJob || !tankJob) {
          throw new NotFoundError(`No jobs for user with id ${userId}`);
        }
        res.status(StatusCodes.OK).send(` All jobs for userId ${userId} deleted`);
      } catch (error) {
        console.log(error);
      }

}

module.exports = {getAllJobs}