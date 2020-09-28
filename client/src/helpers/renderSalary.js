function renderSalary(salaryFrom, salaryTo, salaryCurrency) {
  const formatSalary = new Intl.NumberFormat("en-US", {});

  if (salaryCurrency === "USD") {
    return `от  
        $${formatSalary.format(salaryFrom)} до $${formatSalary.format(
      salaryTo,
    )} за месяц`;
  }
  if (!salaryFrom && salaryTo) {
    if (salaryCurrency === "USD") {
      return `до $${formatSalary.format(salaryTo)} за месяц `;
    }
    return `до ${formatSalary.format(salaryTo)} сум за месяц `;
  }
  if ((salaryTo && salaryFrom === salaryTo) || (salaryFrom && !salaryTo)) {
    if (salaryCurrency === "USD") {
      return `от $${formatSalary.format(salaryFrom)} за месяц `;
    }
    return `от ${formatSalary.format(salaryFrom)} сум за месяц `;
  }
  if (!salaryFrom && !salaryTo) {
    return "з/п не указана";
  }
  return `от ${formatSalary.format(salaryFrom)} сум до ${formatSalary.format(
    salaryTo,
  )} сум за месяц`;
}

export default renderSalary;
