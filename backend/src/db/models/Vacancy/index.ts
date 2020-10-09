import { Schema, Document, Model, Types, model } from "mongoose";

import { getSimilarVacancies, formatSalary } from "./instanceMethods";
import { getVacancies } from "./statics";

export type VacancyCategory =
  | "Автомобильный бизнес"
  | "Административная работа"
  | "Банки, инвестиции"
  | "Охрана, безопасность"
  | "Бухгалтерия, финансы"
  | "Высший менеджмент"
  | "Госслужба, НКО"
  | "Производство, сырьё, с/х"
  | "Домашний персонал"
  | "Закупки"
  | "IT, интернет, телеком"
  | "Консультирование"
  | "Маркетинг, реклама, PR"
  | "Искусство, развлечения"
  | "Медицина, фармацевтика"
  | "Образование, наука"
  | "Без опыта, студенты"
  | "Фитнес, салоны красоты"
  | "Строительство"
  | "Транспорт, логистика"
  | "Страхование"
  | "Управление персоналом"
  | "Юриспруденция"
  | "Продажи"
  | "ЖКХ, эксплуатация"
  | "Туризм, гостиницы, рестораны";

export interface IVacancyAddress {
  name?: string;
  lat?: number;
  lng?: number;
  district?: string;
}

export interface IVacancySalary {
  from?: number;
  to?: number;
  currency?: string;
}

export interface IVacancySchema {
  hashId: string;
  title: string;
  category: VacancyCategory;
  companyName: string;
  description: string;
  date: number;
  link: string;
  contactPhone?: string;
  address?: IVacancyAddress;
  noExperience?: boolean;
  salary?: IVacancySalary;
  partTime?: boolean;
  remote?: boolean;
}

export interface IVacancyDocument extends IVacancySchema, Document {
  _id: Types.ObjectId;
  getSimilarVacancies: typeof getSimilarVacancies;
  formattedSalary: string;
}

const VacancyAddress = new Schema(
  {
    name: { type: String, required: false },
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
    district: { type: String, required: false },
  },
  { _id: false }
);

const VacancySalary = new Schema(
  {
    from: { type: Number, required: false },
    to: { type: Number, required: false },
    currency: { type: String, required: false },
  },
  {
    _id: false,
  }
);

export const VacancySchema = new Schema({
  hashId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  companyName: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Number, required: true },
  link: { type: String, required: true },
  contactPhone: { type: String, required: false },
  address: { type: VacancyAddress, required: false },
  noExperience: { type: Boolean, required: false },
  salary: { type: VacancySalary, required: false },
  formattedSalary: { type: String, get: formatSalary },
  partTime: { type: Boolean, required: false },
  remote: { type: Boolean, required: false },
});

VacancySchema.methods.getSimilarVacancies = getSimilarVacancies;

VacancySchema.statics.get = getVacancies;

interface IVacancyModel extends Model<IVacancyDocument> {
  get: typeof getVacancies;
}

export const VacancyModel: IVacancyModel = model<
  IVacancyDocument,
  IVacancyModel
>("vacancy", VacancySchema);
