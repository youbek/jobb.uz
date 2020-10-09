import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import "styled-components/macro";

import VacancyCategories from "./VacancyCategories";
import {
  VacancyFeed,
  Container,
  Row,
  Col,
  Helmet,
  Breadcrumb,
} from "components";

import {
  LATEST_VACANCIES_RESULT,
  LATEST_VACANCIES_VARS,
  LATEST_VACANCIES,
} from "graphql/queries";

import { useFilters, useWindowDimensions } from "hooks";
import { IFilters } from "hooks/useFilters";

const StyledContainer = styled(Container)`
  display: block;
  min-height: calc(100vh - 260px);
`;

function Main() {
  const { loading, data, fetchMore, refetch } = useQuery<
    LATEST_VACANCIES_RESULT,
    LATEST_VACANCIES_VARS
  >(LATEST_VACANCIES);
  const { isTablet } = useWindowDimensions();

  const { filters } = useFilters(handleFiltersChange);

  const [allFetched, setAllFetched] = useState(false);

  useEffect(() => {
    if (!loading) {
      return;
    }

    handleLoadMore();
  }, [loading]);

  function handleFiltersChange(newFilters: IFilters) {
    if (loading) {
      return;
    }

    refetch({
      options: newFilters,
    });
  }

  function handleLoadMore() {
    if (!data) {
      return;
    }

    const lastVacancy = data.latestVacancies[data.latestVacancies.length - 1];

    fetchMore({
      variables: {
        options: {
          cursor: lastVacancy._id,
        },
      },
      updateQuery: (prev, options) => {
        if (
          !options.fetchMoreResult ||
          !options.fetchMoreResult.latestVacancies.length
        ) {
          setAllFetched(true);
          return prev;
        }

        const {
          fetchMoreResult: { latestVacancies },
        } = options;

        return {
          latestVacancies: [...prev.latestVacancies, ...latestVacancies],
        };
      },
    });
  }

  return (
    <div>
      <Helmet categoryName={filters.category} />
      <Breadcrumb />

      <StyledContainer>
        {!filters.category && (
          <Row>
            <Col size="col12">
              <VacancyCategories />
            </Col>
          </Row>
        )}

        <Row css="margin-top: 1.5rem">
          <Col size="col8">
            <VacancyFeed
              vacancies={data ? data.latestVacancies : []}
              isLoading={loading}
              onLoadMore={handleLoadMore}
              searchText={filters.title}
            />
          </Col>
          {!isTablet && (
            <Col size="col4">
              {/* <JobsFilter filters={searchFilters} loading={jobsQuery.loading} /> */}
            </Col>
          )}
        </Row>
        {/* <ScrollToTopButton /> */}
      </StyledContainer>
    </div>
  );
}

export default Main;
