const mongoose = require("mongoose");
const nanoid = require("nanoid");

const UserSchema = new mongoose.Schema({
  hashId: {
    type: String,
    required: true,
    unique: true,
    default: nanoid(10),
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isHr: { type: Boolean, required: false, default: false },
  phoneNumber: { type: String, required: false, default: "" },
  address: { type: String, required: false, default: "" },
  password: { type: String, required: true },
});

module.exports = mongoose.model("UserModel", UserSchema);
