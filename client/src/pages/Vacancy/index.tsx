import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { Redirect, useParams } from "react-router-dom";
import { Breadcrumb, Helmet, Row } from "components";
import { VacancyPageContainer, VacancyPageSpinner } from "components/JobPage";
import Info from "./Info";
import Address from "./Address";
import VacancyFeed from "components/VacancyFeed";

import { VACANCY, VACANCY_RESULT, VACANCY_VARS } from "graphql/queries";

interface Props {
  hashId: string;
}

function Vacancy() {
  const { hashId } = useParams<{ hashId: string }>();
  const { loading, data, error } = useQuery<VACANCY_RESULT, VACANCY_VARS>(
    VACANCY,
    {
      variables: { hashId },
    }
  );

  if (error) throw new Error(`Error ${error.message}`);

  if (loading) return <VacancyPageSpinner />;

  if (!data || !data.vacancy) {
    return <Redirect to="/404" />;
  }

  const { vacancy } = data;

  return (
    <React.Fragment>
      <Helmet vacancy={vacancy} />
      <Breadcrumb categoryName={vacancy.category} />
      <VacancyPageContainer>
        <Row>
          <Info vacancy={vacancy} />
          <Address address={vacancy.address} />
        </Row>
        <Row>
          <VacancyFeed vacancies={vacancy.similarVacancies!} />
        </Row>
      </VacancyPageContainer>
    </React.Fragment>
  );
}

export default Vacancy;
