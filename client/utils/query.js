import qs from "query-string";

export const getQuery = (query) => {
  if (!query || !Object?.keys(query)) {
    return "";
  }

  return `?${qs.stringify(query, {
    skipNull: true,
  })}`;
};
