import { IVacancyDocument } from "..";

export function formatSalary(this: IVacancyDocument) {
  const salary = this.salary;
  if (!salary) {
    return "з/п не указана";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "UZS",
    minimumFractionDigits: 0,
  });

  const from = salary.from
    ? formatter.format(salary.from).replace(/,|UZS/g, " ")
    : undefined;
  const to = salary.to
    ? formatter.format(salary.to).replace(/,|UZS/g, " ")
    : undefined;

  if (from && !to) {
    return `от ${from} ${salary.currency}`;
  } else if (!from && to) {
    return `до ${to} ${salary.currency}`;
  } else {
    return `от ${from} до ${to} ${salary.currency}`;
  }
}
