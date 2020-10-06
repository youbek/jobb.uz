import { IVacancyDocument, IVacancySchema, VacancyModel } from "db";
import { MongooseFilterQuery } from "mongoose";
import { IVacancySearchInput } from "./types";

export default {
  Query: {
    vacancy: async (
      _parent: any,
      args: { hashId: string }
    ): Promise<IVacancyDocument | null> => {
      const job = await VacancyModel.findOne({ hashId: args.hashId });

      return job;
    },
    latestVacancies: async (
      _parent: any,
      args: { options: IVacancySearchInput }
    ) => {
      const searchQuery: MongooseFilterQuery<IVacancySchema> = {};

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

      const jobs = await VacancyModel.find(searchQuery, null, {
        limit: 20,
        sort: { _id: -1 },
      });

      return jobs;
    },
  },
  Vacancy: {
    salary: (vacancy: IVacancyDocument) => {
      const { salary } = vacancy;

      if (!salary) {
        return "з/п не указана";
      }

      const { currency, from, to } = salary;

      if (from && !to) {
        return `от ${from} ${currency}`;
      } else if (!from && to) {
        return `до ${to} ${currency}`;
      } else {
        return `от ${from} до ${to} ${currency}`;
      }
    },
  },
};
