const JobModel = require("./model");
const { escapeRegex } = require("../../helpers");

module.exports = {
  Query: {
    job: async (_, args) => {
      try {
        const foundJob = await JobModel.findOne({ hashId: args.hashId });
        return foundJob;
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
    getLatestJobs: async (_, args) => {
      try {
        const {
          cursor,
          categoryName,
          district,
          partTime,
          noExperience,
          title,
        } = args && args.options ? args.options : {};

        const searchQuery = {};
        const sortQuery = { _id: -1 };

        if (title) {
          searchQuery.title = { $regex: `.*${title}.*`, $options: "i" };
        }

        if (cursor) {
          searchQuery._id = { $lt: cursor };
        }

        if (categoryName) {
          searchQuery.category = { $regex: categoryName, $options: "i" };
        }

        if (district) {
          searchQuery["address.district"] = district;
        }

        if (partTime) {
          searchQuery.partTime = partTime;
        }

        if (noExperience) {
          searchQuery.noExperience = noExperience;
        }

        const jobs = await JobModel.find(searchQuery)
          .sort(sortQuery)
          .limit(20);

        return jobs;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Job: {
    similarJobs: async job => {
      const similarJobs = await JobModel.find({
        $text: { $search: job.title.replace(/по|в|на|для|к/gi, "") },
        _id: { $ne: job._id },
      }).limit(5);

      return similarJobs;
    },
  },
};
