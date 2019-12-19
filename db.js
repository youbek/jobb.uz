const mongoose = require("mongoose");

async function connect(url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  connect: connect,
};
