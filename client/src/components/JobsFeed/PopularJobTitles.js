import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import capitalize from "lodash/capitalize";

import ButtonLink from "../Buttons/ButtonLink";

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.div`
  color: #73757a;
  font-weight: 600;
  font-size: 1rem;
`;

const Container = styled.div`
  margin-top: 0.5rem;
`;

const JobTitle = styled(ButtonLink)`
  color: #383c43;
  background-color: #eff1f2;
  font-size: 14px;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;

  &:hover {
    background-color: #eaf1ff;
    color: #383c43;
  }
`;

function PopularJobTitles({ popularProfessions, currentUrl }) {
  return (
    <Wrapper>
      {popularProfessions > 0 && <Title>Популярные профессии</Title>}
      <Container>
        {popularProfessions.map(profession => (
          <JobTitle
            key={profession.id}
            to={`${currentUrl}/${profession.name
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
          >
            {capitalize(profession.name)}
          </JobTitle>
        ))}
      </Container>
    </Wrapper>
  );
}

PopularJobTitles.propTypes = {
  popularProfessions: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentUrl: PropTypes.string.isRequired,
};

export default PopularJobTitles;
