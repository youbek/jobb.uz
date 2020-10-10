import { MongooseFilterQuery, QueryFindOptions } from "mongoose";
import { VacancyModel, IVacancySchema } from "db/models";
import { IVacancyDocument } from "..";

export interface IVacancySearchInput {
  after?: number;
  title?: string;
  category?: string;
  district?: string;
  partTime?: boolean;
  noExperience?: boolean;
  remote?: boolean;
}

export async function getVacancies(
  this: typeof VacancyModel,
  query: MongooseFilterQuery<IVacancySchema> = {},
  args?: IVacancySearchInput,
  projection?: any,
  options: QueryFindOptions = {}
): Promise<IVacancyDocument[]> {
  const search = { ...query };

  if (args) {
    const { title, district, category, noExperience, partTime, remote } = args;

    if (title) {
      search.title = { $regex: `.*${title}.*`, $options: "i" };
    }

    if (category) {
      search.category = { $regex: category, $options: "i" };
    }

    if (district) {
      search["address.district"] = district;
    }

    if (partTime) {
      search.partTime = partTime;
    }

    if (noExperience) {
      search.noExperience = noExperience;
    }

    if (remote) {
      search.remote = remote;
    }
  }

  const vacancies = await this.find(search, projection, {
    ...options,
    sort: { date: -1 },
    skip: args ? args.after : 0,
    limit: 20,
  });

  return vacancies;
}
