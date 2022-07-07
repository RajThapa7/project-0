

const mongoose = require("mongoose");

const electricSchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
      enum: ["New Installation", "General Repairing"],
      default: "General Repairing",
    },
    location: {
      type: String,
      required: [true, "Please provide job location"],
    },
    description: {
      type: String,
      // required: [true, 'Please provide job description'],
      maxlength: 250,
      minlength: 10,
    },
    image: 
    [{
      type: String
  }] ,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Client",
      required: [true, "Please provide client info"],
    },
    status:{
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const Electric = mongoose.model("Electric", electricSchema );

const plumberSchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
      enum: ["New Installation", "General Repairing"],
      default: "General Repairing",
    },
    location: {
      type: String,
      required: [true, "Please provide job location"],
    },
    description: {
      type: String,
      // required: [true, 'Please provide job description'],
      maxlength: 250,
      minlength: 10,
    }, 
    image: 
        [{
          type: String
      }] ,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Client",
      required: [true, "Please provide client info"],
    },
    status:{
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    }
  },
  {
    timestamps: true,
  } 
);

const Plumber = mongoose.model("Plumber", plumberSchema );


const tankSchema = new mongoose.Schema(
    {
      serviceType: {
        type: String,
        enum: ["Roof tank", "Reserve tank", "Reserve tank + Roof tank"],
        default: "General Repairing",
      },
      location: {
        type: String,
        required: [true, "Please provide job location"],
      },
      description: { 
        type: String,
        // required: [true, 'Please provide job description'],
        maxlength: 250,
        minlength: 10,
      }, 
      image: 
        [{
          type: String
      }] ,  
      createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "Client",
        required: [true, "Please provide client info"],
      },
      status:{
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
      }
    },
    {
      timestamps: true,
    } 
  );
   
  const Tank = mongoose.model("Tank", tankSchema );



module.exports = {Electric, Plumber, Tank}; 