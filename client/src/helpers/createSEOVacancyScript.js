function createSEOVacancyScript(job) {
  return `
  {
    "@context" : "http://schema.org",
    "@type" : "JobPosting",
    "title" : "${job.title}",
    "description" : "${job.description}",
    "hiringOrganization" : {
      "@type" : "Organization",
      "name" : "${job.companyName}",
    },
    "jobLocation" : {
      "@type" : "Place",
      "city": "Tashkent",
      "country": "Uzbekistan",
      "address" : {
        "@type" : "PostalAddress",
        "streetAddress" : "${job.address}",
      }
    }`;
}

export default createSEOVacancyScript;
