import moment from "moment";
import { IVacancyDocument } from "db/models";

export function checkExpired(this: IVacancyDocument): boolean {
  const today = moment();
  const expirationDate = moment(this.date).add(30, "days");

  return today.isAfter(expirationDate);
}

