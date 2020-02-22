import React from "react";
import { render } from "frontend-test-utils.js";
import { JobCard } from "components";
import sampleJob from "./sampleJob";

test("JobCard component rendering", () => {
  // GOALS
  // 1. RENDER sampleJob in JobCard ✔️
  // 2. TEST RENDERED JobCard WITH SNAPSHOT TESTING

  const jobDate = new Date();

  sampleJob.date = jobDate;

  const { container: SampleJobContainer } = render(<JobCard job={sampleJob} />);

  const SampleJob = SampleJobContainer.firstChild;

  expect(SampleJob).toMatchSnapshot();
});
