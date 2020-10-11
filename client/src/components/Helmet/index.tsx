import React from "react";
import { Helmet as ReactHelmet } from "react-helmet";
import {
  createSEOVacancyScript,
  createJobPageTitle,
  createJobsFeedPageTitle,
} from "helpers";
import { IVacancy } from "types";

interface Props {
  vacancy?: IVacancy;
  categoryName?: string;
}

function Helmet({ vacancy, categoryName }: Props) {
  const url = window.location.href;

  if (!vacancy) {
    return (
      <ReactHelmet>
        <title>{createJobsFeedPageTitle(categoryName)}</title>
        <link rel="canonical" href={url} />
      </ReactHelmet>
    );
  }

  return (
    <ReactHelmet>
      <title>{createJobPageTitle(vacancy.title, vacancy.companyName)}</title>
      <script type="application/ld+json">
        {createSEOVacancyScript(vacancy)}
      </script>
      <link rel="canonical" href={url} />
    </ReactHelmet>
  );
}

export default Helmet;
