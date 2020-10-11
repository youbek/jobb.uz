import { MongooseFilterQuery, QueryFindOptions } from "mongoose";
import { IVacancyDocument, IVacancySchema, VacancyModel } from "..";
import { IVacancySearchInput } from "../statics/getVacancies";

export async function getSimilarVacancies(
  this: IVacancyDocument,
  query: MongooseFilterQuery<IVacancySchema> = {},
  args?: IVacancySearchInput,
  projection?: any,
  options?: QueryFindOptions
) {
  const { hashId, title, category } = this;

  const vacancies = await VacancyModel.get(
    {
      hashId: { $ne: hashId },
      title: {
        $regex: `${title.toLowerCase().trim().replace(" ", "|")}`,
        $options: "i",
      },
      category,
      ...query,
    },
    args,
    projection,
    options
  );

  return vacancies;
}
