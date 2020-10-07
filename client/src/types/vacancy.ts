export interface IVacancy {
  _id: string;
  hashId: string;
  title: string;
  category: string;
  address: VacancyAddress;
  companyName: string;
  description: string;
  date: Date;
  link: string;
  sourceText: string;
  expired: boolean;
  similarVacancies?: IVacancy[];
  contactPhone?: string;
  salary?: string;
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
