import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const JobsFeedEmpty = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 1.25rem;
`;

function JobsEmpty({ searchTitle }) {
  return (
    <JobsFeedEmpty>
      {`Вакансии ${
        searchTitle ? `по запросу "${searchTitle}"` : ""
      } не найдены. Попробуйте другие варианты поискового запроса или
      сбросьте фильтр`}
    </JobsFeedEmpty>
  );
}

JobsEmpty.propTypes = {
  searchTitle: PropTypes.string,
};

export default JobsEmpty;
