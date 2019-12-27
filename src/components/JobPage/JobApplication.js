import React from "react";
import moment from "moment";

import Button from "../Buttons/Button";

function JobApplication({ job }) {
  // VALIDATING WHETHER JOB EXPIRED OR NOT
  const date = new Date(Number(job.date)).toString();
  const dateFrom = moment()
    .subtract(30, "d")
    .format("YYYY-MM-DD");
  const isJobActive = new Date(date) > new Date(dateFrom);

  return (
    <div>
      {isJobActive ? (
        <Button>Откликнуться</Button>
      ) : (
        <Button disabled>Вакансия недоступна</Button>
      )}
    </div>
  );
}

export default JobApplication;
