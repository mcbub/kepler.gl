export function parseQueryString(query) {
  const searchParams = new URLSearchParams(query);
  const params = [...searchParams].reduce((queryParams, entry) => ({
    ...queryParams,
    ...(entry  && entry.length === 2 ?
        {[entry[0]]: entry[1]} : null
    )
  }), {});

  return params;
}
