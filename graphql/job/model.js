const mongoose = require("mongoose");
const nanoid = require("nanoid");

const JobSchema = new mongoose.Schema({
  hashId: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid(10),
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: false,
    default: "Active",
  },
  address: {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  companyName: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: false,
    default: "",
  },
  description: {
    type: String,
    required: true,
  },
  noExperience: {
    type: Boolean,
    required: false,
    default: false,
  },
  salaryFrom: {
    type: Number,
    required: true,
  },
  salaryTo: {
    type: Number,
    required: true,
  },
  partTime: {
    type: Boolean,
    required: false,
    default: false,
  },
  forTeens: {
    type: Boolean,
    required: false,
    default: false,
  },
  date: {
    type: String,
    required: false,
    default: Date.now,
  },
  authorId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("JobModel", JobSchema);
