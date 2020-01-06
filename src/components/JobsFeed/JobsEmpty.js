import React from "react";
import styled from "styled-components";

const JobsFeedEmpty = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 1.25rem;
`;

function JobsEmpty() {
  return (
    <JobsFeedEmpty>
      Вакансии не найдены. Попробуйте другие варианты поискового запроса или
      сбросьте фильтр
    </JobsFeedEmpty>
  );
}

export default JobsEmpty;
