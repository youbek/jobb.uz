import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Col8 from "../Layout/Col8";
import Spinner from "../Spinner/Spinner";
import JobCard from "./JobCard/JobCard";

// STYLED COMPONENT
const NoSimilarJobs = styled.div`
  padding: 4rem;
  font-weight: 500;
  text-align: center;
  margin-top: 2rem;
  background-color: #f0f0f0;
  color: #707070;
  border-radius: 10px;
`;

function SimilarJobsFeed({ similarJobs, loading }) {
  return (
    <Col8 className="mt-4">
      {// IF NO JOBS FOUND
      Array.isArray(similarJobs) && similarJobs.length === 0 && (
        <NoSimilarJobs>Похожих вакансий не найдено </NoSimilarJobs>
      )}

      {// ELSE
      Array.isArray(similarJobs) && similarJobs.length > 0 && (
        <React.Fragment>
          <div className="mt-4 mb-2">Похожие вакансии</div>
          {similarJobs.map((job, index) => (
            <JobCard key={index} job={job}></JobCard>
          ))}
        </React.Fragment>
      )}

      {loading && similarJobs.length !== 0 && <Spinner className="mr-2" />}
    </Col8>
  );
}

export default SimilarJobsFeed;
