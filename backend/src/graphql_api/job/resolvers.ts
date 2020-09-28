import { IJobDocument, IJobSchema, JobModel } from "db";
import { MongooseFilterQuery } from "mongoose";
import { IJobSearchInput } from "./types";

export default {
  Query: {
    job: async (
      _parent: any,
      args: { hashId: string }
    ): Promise<IJobDocument | null> => {
      const job = await JobModel.findOne({ hashId: args.hashId });

      return job;
    },
    latestJobs: async (_parent: any, args: { options: IJobSearchInput }) => {
      const searchQuery: MongooseFilterQuery<IJobSchema> = {};

      const {
        title,
        district,
        category,
        cursor,
        noExperience,
        partTime,
      } = args.options;

      if (title) {
        searchQuery.title = { $regex: `.*${title}.*`, $options: "i" };
      }

      if (cursor) {
        searchQuery._id = { $lt: cursor };
      }

      if (category) {
        searchQuery.category = { $regex: category, $options: "i" };
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

      const jobs = await JobModel.find(searchQuery, null, {
        limit: 20,
        sort: { _id: -1 },
      });

      return jobs;
    },
  },
};
