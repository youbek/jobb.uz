import moment from "moment";
import { IVacancyDocument } from "..";

export function getSourceText(this: IVacancyDocument): string {
  const { link, date } = this;

  const dateText = moment(date).locale("ru").fromNow();

  if (link.includes("hh.uz")) {
    return `${dateText} с HeadHunter`;
  } else {
    return `${dateText} с Rabota.uz`;
  }
}
