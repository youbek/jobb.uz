import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { parse, stringify } from "query-string";

export interface IFilters {
  title?: string;
  district?: string;
  category?: string;
  partTime?: boolean;
  noExperience?: boolean;
  remote?: boolean;
}

const initalFilters: IFilters = {
  title: undefined,
  district: undefined,
  category: undefined,
  partTime: undefined,
  noExperience: undefined,
  remote: undefined,
};

function useFilters(onChange?: (newFilters: IFilters) => void) {
  const location = useLocation();
  const history = useHistory();

  const [filters, setFilters] = useState<IFilters>(initalFilters);

  useEffect(() => {
    handleQueryChange();
  }, [location]);

  function handleQueryChange() {
    const query = location.search;

    try {
      const parsedQuery = parse(query);

      // JUST REFERENCING, BECAUSE TO KNOW WHEATHER parsedQuery HAS UPDATES
      let currentFilters = filters;

      if(!Object.keys(parsedQuery).length) {
        currentFilters = { ...initalFilters }
      } else {
        // UPDATE EACH FILTER, NOT SET WRONG FIELDS IN STATE
        for (const key in parsedQuery) {
              if (key in currentFilters) {
            currentFilters = {
              ...currentFilters,
              [key]: parsedQuery[key],
            };
          }

          continue;
        }
      }

      if (currentFilters !== filters) {
        setFilters(currentFilters);

        if (onChange) {
          onChange(currentFilters);
        }
      }
    } catch (err) {
      console.error(`Couldn't parse location.search. \n${err}`);
    }
  }

  function setNewQuery(filters: IFilters | ((filters: IFilters) => IFilters)) {
    try {
      // TODO: REPLACE {...filters} WITH filters AFTER @types/query-string FIXES
      const newFilterURL = stringify({ ...filters }, { skipNull: true });
      history.push({
        pathname: "/",
        search: `?${newFilterURL}`,
      });
    } catch (err) {
      console.error("Couldn't setNewQuery", "/");
    }
  }

  function resetFilters() {
    history.push("/");
  }

  return { filters, setNewQuery, resetFilters };
}
export default useFilters;
