import React from "react";
import styled from "styled-components";
import "styled-components/macro";
import { useQuery } from "@apollo/client";

import { Redirect, useParams } from "react-router-dom";
import { Breadcrumb, Helmet, Row, Container, Spinner, Col } from "components";

import Info from "./Info";
import Address from "./Address";
import VacancyFeed from "components/VacancyFeed";

import { VACANCY, VACANCY_RESULT, VACANCY_VARS } from "graphql/queries";

const PageContainer = styled(Container)`
  min-height: calc(100vh - 260px);
  display: block;
`;

function Vacancy() {
  const { hashId } = useParams<{ hashId: string }>();
  const { loading, data, error } = useQuery<VACANCY_RESULT, VACANCY_VARS>(
    VACANCY,
    {
      variables: { hashId },
    }
  );

  if (error) throw new Error(`Error ${error.message}`);

  if (loading) return <Spinner />;

  if (!data || !data.vacancy) {
    return <Redirect to="/404" />;
  }

  const { vacancy } = data;

  return (
    <>
      <Helmet vacancy={vacancy} />
      <Breadcrumb
        paths={[
          { text: vacancy.category, url: `/?category=${vacancy.category}` },
          { text: vacancy.title },
        ]}
      />
      <PageContainer>
        <Row>
          <Info vacancy={vacancy} />
          <Address address={vacancy.address} />
        </Row>
        <Row css="margin-top: 1.5rem">
          <Col size="col8">
            <VacancyFeed vacancies={vacancy.similarVacancies!} />
          </Col>
        </Row>
      </PageContainer>
    </>
  );
}

export default Vacancy;
