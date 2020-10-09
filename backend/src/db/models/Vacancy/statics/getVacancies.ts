import { MongooseFilterQuery, QueryFindOptions } from "mongoose";
import { VacancyModel, IVacancyAddress, IVacancySchema } from "db/models";

export interface IVacancySearchInput {
  cursor?: string;
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
  options?: QueryFindOptions
) {
  const search = { ...query };

  if (args) {
    const { title, district, category, cursor, noExperience, partTime } = args;

    if (title) {
      search.title = { $regex: `.*${title}.*`, $options: "i" };
    }

    if (cursor) {
      search._id = { $lt: cursor };
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
  }

  const vacancies = await this.find(search, projection, options);

  console.log(vacancies[0].formattedSalary);

  return vacancies;
}
