import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

import { jobCategories } from "constants/index";

function useJobFilter() {
  const location = useLocation();
  const [searchFilters, setSearchFilters] = useState({});
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const jobSearchQueryStr = location.search;
    const newSearchFilters = queryString.parse(jobSearchQueryStr, {
      parseBooleans: true,
      parseNumbers: true,
    });

    const category = jobCategories.find(category =>
      category.transliteratedName === searchFilters.categoryName
        ? category
        : null,
    );

    const newFilters = {
      ...searchFilters,
      categoryName: category && category.name,
    };

    setSearchFilters(newSearchFilters);
    setFilters(newFilters);
  }, [location]);

  const history = useHistory();

  function redirector(filters, dontCombineCurrentFilter) {
    if (!filters) {
      history.push("/");
      return;
    }

    try {
      const currentFilters = !dontCombineCurrentFilter
        ? queryString.parse(window.location.search)
        : {};
      const newFilterURL = queryString.stringify(
        { ...currentFilters, ...filters },
        { skipNull: true },
      );

      history.push(`/?${newFilterURL}`);
    } catch (err) {
      history.push("/");
    }
  }

  return [redirector, searchFilters, filters];
}

export default useJobFilter;
