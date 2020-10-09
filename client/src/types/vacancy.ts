export interface IVacancy {
  _id: string;
  hashId: string;
  title: string;
  category: string;
  address: IVacancyAddress;
  companyName: string;
  description: string;
  date: Date;
  link: string;
  sourceText: string;
  expired: boolean;
  formattedSalary: string;
  similarVacancies?: IVacancy[];
  contactPhone?: string;
  noExperience?: boolean;
  partTime?: boolean;
  remote?: boolean;
}

export interface IVacancyAddress {
  name?: string;
  lat?: number;
  lng?: number;
  district?: string;
}

export type VacancyCategory = {
  name: string;
  icon: string;
};
