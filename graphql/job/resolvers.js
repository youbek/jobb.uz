const JobModel = require("./model");
const { AuthenticationError } = require("apollo-server");
const { JobCategories } = require("../../constant");
const { escapeRegex } = require("../../helpers");

module.exports = {
  Query: {
    job: async (_, args) => {
      try {
        const foundJob = await JobModel.findOne({ hashId: args.hashId });
        console.log(foundJob);
        return foundJob;
      } catch (err) {
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
    jobCategories: () => JobCategories,
    getPopularJobTitles: async (_, args) => {
      const { categoryName } = args;

      if (!categoryName) {
        return [];
      }

      const subCategories = JobCategories.find(
        category => category.name.toLowerCase() === categoryName.toLowerCase(),
      ).subCategories;

      const count = await Promise.all(
        subCategories.map(async category => {
          const amount = await JobModel.count({ title: category });
          return { name: category, amount };
        }),
      );

      const sorted = count.sort((categoryA, categoryB) =>
        categoryA.amount > categoryB.amount
          ? -1
          : categoryA.amount === categoryB.amount
          ? categoryA.name > categoryB.name
            ? 1
            : -1
          : 1,
      );

      return sorted.filter((category, index) => (index < 5 ? category : null));
    },
    searchJob: async (_, args) => {
      const { keyword } = args;
      const regex = new RegExp(escapeRegex(keyword), "gi");
      const hotResults = await JobModel.find(
        { title: regex },
        { title: 1, hashId: 1, _id: -1 },
      ).distinct("title");

      return hotResults;
    },
    similarJobsPay: async (_, args) => {
      const { title } = args;

      const similarJobs = await JobModel.find(
        { title },
        { _id: 0, salaryTo: 1, salaryFrom: 1 },
      );

      let minAmount = undefined;
      let maxAmount = undefined;

      for (let i = 0; i < similarJobs.length; i++) {
        const salaryFrom = similarJobs[i].salaryFrom;
        const salaryTo = similarJobs[i].salaryTo;
        minAmount =
          minAmount === undefined
            ? salaryFrom
            : minAmount > salaryFrom
            ? salaryFrom
            : minAmount;
        maxAmount =
          maxAmount === undefined
            ? salaryTo
            : minAmount < salaryTo
            ? salaryTo
            : minAmount;
      }

      return {
        minAmount,
        maxAmount,
      };
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
  Mutation: {
    postJob: async (parent, args, context) => {
      if (!context.loggedIn) {
        throw new AuthenticationError();
      }

      const jobModelToPost = { ...args };
      const jobCategory = JobCategories.find(category =>
        category.subCategories.includes(jobModelToPost.title),
      ).name;

      jobModelToPost.authorId = context.user.hashId;
      jobModelToPost.category = jobCategory;

      console.log(jobModelToPost);

      const newJob = new JobModel(jobModelToPost);

      const savedJob = await newJob.save();

      return savedJob;
    },
  },
};
