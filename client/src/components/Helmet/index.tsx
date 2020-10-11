import React from "react";
import { Helmet as ReactHelmet } from "react-helmet";
import { IVacancy } from "types";

interface Props {
  vacancy?: IVacancy;
  categoryName?: string;
}

function Helmet({ vacancy, categoryName }: Props) {
  return (
    <ReactHelmet>
      <title>
        {(() => {
          if (vacancy) {
            return `Вакансия ${vacancy.title} - Работа в компании ${vacancy.companyName}`;
          }

          if (categoryName) {
            return `Свежие вакансии в сфере ${categoryName} в Ташкенте на сайте jobb.uz`;
          }

          return `Работа в Ташкенте - поиск работы на сайте jobb.uz`;
        })()}
      </title>
    </ReactHelmet>
  );
}

export default Helmet;
