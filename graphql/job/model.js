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
    name: { type: String, required: false },
    lat: { type: Number, required: false },
    long: { type: Number, required: false },
    district: { type: String, required: false },
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
    required: false,
  },
  salaryTo: {
    type: Number,
    required: false,
  },
  salaryCurrency: { type: String, required: false },
  partTime: {
    type: Boolean,
    required: false,
    default: false,
  },
  link: { type: String, required: true },
  date: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("JobModel", JobSchema);
