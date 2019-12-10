const JobModel = require("./model");
const UserModel = require("../user/model");
const { AuthenticationError } = require("apollo-server");
const { JobCategories } = require("../../constant");

module.exports = {
  Query: {
    job: async (_, args) => {
      try {
        const foundJob = await JobModel.findOne({ hashId: args.hashId });
        return foundJob;
      } catch (err) {
        throw new Error(err);
      }
    },
    getLatestJobs: async (_, args) => {
      try {
        const { cursor, limit, categoryName, subCategoryName } = args;
        const searchQuery = {};

        if (cursor) {
          searchQuery._id = { $lt: cursor };
        }

        if (categoryName) {
          searchQuery.category = { $regex: categoryName, $options: "i" };
        }

        if (subCategoryName) {
          searchQuery.title = { $regex: subCategoryName, $options: "i" };
        }

        const jobs = await JobModel.find(searchQuery)
          .sort({ date: -1 })
          .limit(limit);

        return jobs;
      } catch (err) {
        throw new Error(err);
      }
    },
    jobCategories: () => JobCategories,
  },
  Job: {
    author: async job => {
      const author = await UserModel.findOne(
        { hashId: job.authorId },
        { firstName: 1, lastName: 1, hashId: 1, _id: 0 },
      );

      return author;
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
