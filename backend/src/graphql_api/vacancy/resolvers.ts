import { IVacancyDocument, VacancyModel } from "db";
import { IVacancySearchInput } from "./types";

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
    ): Promise<IVacancyDocument[]> => {
      const vacancies = await VacancyModel.get({}, args.options, null);

      return vacancies;
    },
  },
  Vacancy: {
    similarVacancies: async (
      vacancy: IVacancyDocument
    ): Promise<IVacancyDocument[]> => {
      const vacancies = await vacancy.getSimilarVacancies();

      return vacancies;
    },
    formattedSalary: (vacancy: IVacancyDocument): string => {
      return vacancy.getFormattedSalary();
    },
    sourceText: (vacancy: IVacancyDocument): string => {
      return vacancy.getSourceText();
    },
    expired: (vacancy: IVacancyDocument): boolean => {
      return vacancy.checkExpired();
    },
  },
};
