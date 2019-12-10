const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(
      'mongodb://youbek:qwertyuiop0099@ds018839.mlab.com:18839/joblink',
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    );
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  connect: connect,
};
