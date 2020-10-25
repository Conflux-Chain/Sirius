import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useSWRWithGetFecher } from '../../../utils/api';

export const useTableData = (url: string) => {
  const location = useLocation();
  const history = useHistory();

  let {
    page: searchPageNumber,
    pageSize: searchPageSize,
    tab,
    ...others
  } = queryString.parse(location.search);

  let parsedPageNumber = '1';
  let parsedPageSize = '10';
  let skip = '0';

  try {
    const page = (Number(searchPageNumber) - 1) * Number(searchPageSize);
    if (window.isNaN(page) || page < 0) {
      throw new Error('invalid page');
    }
    parsedPageNumber = String(searchPageNumber);
    skip = String(page);
  } catch (e) {}

  try {
    const pageSize = Number(searchPageSize);
    if (window.isNaN(pageSize) || pageSize < 0) {
      throw new Error('invalid pageSize');
    }
    parsedPageSize = String(pageSize);
  } catch (e) {}

  const urlWithQuery = queryString.stringifyUrl({
    url,
    query: {
      ...others,
      limit: parsedPageSize as string,
      skip: skip as string,
    },
  });

  const { data, error, mutate } = useSWRWithGetFecher([urlWithQuery]);
  const setPageNumberAndAlterHistory = (pageNumber: number) => {
    const pathNameWithQuery = queryString.stringifyUrl({
      url: location.pathname,
      query: {
        ...others,
        tab,
        page: pageNumber.toString(),
        pageSize: parsedPageSize as string,
      },
    });
    history.push(pathNameWithQuery);
  };

  const setPageSizeAndAlterHistory = (pageSize: number) => {
    const pathNameWithQuery = queryString.stringifyUrl({
      url: location.pathname,
      query: {
        ...others,
        tab,
        page: parsedPageNumber as string,
        pageSize: pageSize.toString(),
      },
    });
    history.push(pathNameWithQuery);
  };

  return {
    pageNumber: parsedPageNumber,
    pageSize: parsedPageSize,
    total: data?.total,
    data,
    error,
    mutate,
    nextPage: () => setPageNumberAndAlterHistory(Number(parsedPageNumber) + 1),
    prevPage: () =>
      setPageNumberAndAlterHistory(Number(parsedPageNumber) - 1 || 1),
    gotoPage: setPageNumberAndAlterHistory,
    setPageSize: setPageSizeAndAlterHistory,
  };
};
