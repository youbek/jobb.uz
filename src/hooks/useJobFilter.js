import { useHistory } from "react-router-dom";
import queryString from "query-string";

function useJobFilter() {
  const history = useHistory();

  function redirector(filters) {
    if (!filters) {
      history.push("/");
      return;
    }

    try {
      const currentFilters = queryString.parse(window.location.search);
      const newFilterURL = queryString.stringify(
        { ...currentFilters, ...filters },
        { skipNull: true },
      );

      history.push(`?${newFilterURL}`);
    } catch (err) {
      history.push("/");
    }
  }

  return redirector;
}

export default useJobFilter;
