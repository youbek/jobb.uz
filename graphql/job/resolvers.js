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
        const { cursor, limit } = args;

        const jobs = await JobModel.find(
          cursor ? { hashId: { $gt: cursor } } : {},
        )
          .limit(limit)
          .sort({ date: -1 });
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

      const jobModelToPost = args.job;
      jobModelToPost.authorId = context.user.hashId;

      const newJob = new JobModel(args.job);

      const savedJob = await newJob.save();

      return savedJob.hashId;
    },
  },
};
