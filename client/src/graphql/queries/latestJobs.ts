import gql from "graphql-tag";
import { JOB_FRAGMENT } from "../fragments";

export interface LATEST_JOBS_RESULT {}

export interface LATEST_JOBS_VARS {}

export const LATEST_JOBS = gql`
  query LatestJobs($options: JobSearchArgs) {
    latestJobs(options: $options) {
      ...jobFragment
    }
  }
  ${JOB_FRAGMENT}
`;
