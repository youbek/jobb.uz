type Vacancy = {
  _id: string;
  hashId: string;
  title: string;
  category: string;
  address: VacancyAddress;
  companyName: string;
  description: string;
  date: Date;
  link: string;
  similarVacancies: Vacancy[];
  contactPhone: string;
  salary: string;
  noExperience: boolean;
  partTime: boolean;
  remote: boolean;
};

type VacancyAddress = {};

export { Vacancy, VacancyAddress };
