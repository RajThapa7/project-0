const Technician = require("../models/technician");
const Client = require("../models/client");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
require("dotenv").config();
const jwt = require('jsonwebtoken');

const registerClient = async (req, res) => {
        const client = await Client.create({...req.body});
        const accessToken = client.createAccessJWT();
        const refreshToken = client.createRefreshJWT();
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, 
            sameSite: "None",   
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
        res.json({ access: accessToken});
};

const registerTechnician = async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    throw new BadRequestError('Please provide email, password and name')
  }
        const technician = await Technician.create({ ...req.body });
        const accessToken = technician.createAccessJWT();
        const refreshToken = technician.createRefreshJWT();
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
        res.json({ access: accessToken});
};
 
const loginClient = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const client = await Client.findOne({ email }); 
  if (!client) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await client.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const accessToken = client.createAccessJWT();
  const refreshToken = client.createRefreshJWT();
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    // secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res
    .status(StatusCodes.OK)
    .json({ data: accessToken, client, message: "logged in successfully" });
};

const loginTechnician = async (req, res) => {
  const { email, password } = req.body; 

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const technician = await Technician.findOne({ email });
  if (!technician) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await technician.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const accessToken = technician.createAccessJWT();
  const refreshToken = technician.createRefreshJWT();
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res
    .status(StatusCodes.OK)
    .json({ data: accessToken, technician, message: "logged in successfully" });
};

const refreshToken = async (req, res)=>{
  if (!req.cookies?.refreshToken) {
    return res.status(406).json({ message: "Unauthorized" });
  }
  // Destructuring refreshToken from cookie
  const refreshToken = req.cookies.refreshToken;
  // Verifying refresh token
  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
    const accessToken = jwt.sign(
      {
        name: payload.name,
        userId: payload.userId, 
      },
      process.env.ACCESS_JWT_SECRET,
      {
        expiresIn: "5m",
      }
    );
    res.json({ accessToken });
  } catch (error) {
    res.json({ error });
  }
};




module.exports = {
  registerClient,
  registerTechnician,
  loginClient,
  loginTechnician,
  refreshToken
};
