import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ButtonLink from "../Buttons/ButtonLink";

function JobApplication({ job }) {
  // VALIDATING WHETHER JOB EXPIRED OR NOT

  const dateFrom = moment()
    .subtract(30, "d")
    .format("YYYY-MM-DD");
  const isJobActive = new Date(job.date) > new Date(dateFrom);

  return (
    <div>
      {isJobActive ? (
        <ButtonLink as="a" href={job.link} target="_blank">
          Откликнуться
        </ButtonLink>
      ) : (
        <ButtonLink disabled>Вакансия недоступна</ButtonLink>
      )}
    </div>
  );
}

JobApplication.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobApplication;