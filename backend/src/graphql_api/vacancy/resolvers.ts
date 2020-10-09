import {
  IVacancyDocument,
  IVacancySchema,
  VacancyModel,
  VacancySchema,
} from "db";
import { MongooseFilterQuery } from "mongoose";
import { IVacancySearchInput } from "./types";

import moment from "moment";

export default {
  Query: {
    vacancy: async (
      _parent: any,
      args: { hashId: string }
    ): Promise<IVacancyDocument | null> => {
      const vacancy = await VacancyModel.findOne({ hashId: args.hashId });

      return vacancy;
    },
    latestVacancies: async (
      _parent: any,
      args: { options?: IVacancySearchInput }
    ) => {
      const vacancies = await VacancyModel.get({}, args.options, null, {
        limit: 20,
        sort: { _id: -1 },
      });

      return vacancies;
    },
  },
  Vacancy: {
    similarVacancies: async (vacancy: IVacancyDocument) => {
      const vacancies = await vacancy.getSimilarVacancies();

      return vacancies;
    },
    sourceText: (vacancy: IVacancyDocument) => {
      const { link, date } = vacancy;

      const dateText = moment(date).locale("ru").fromNow();

      if (link.includes("hh.uz")) {
        return `${dateText} с HeadHunter`;
      } else {
        return `${dateText} с Rabota.uz`;
      }
    },
    expired: (vacancy: IVacancyDocument) => {
      const today = moment();
      const expirationDate = moment(vacancy.date).add(30, "days");

      return today.isAfter(expirationDate);
    },
  },
};
