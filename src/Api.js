import React, { useState, useContext, createContext } from 'react';

const apiContext = createContext();

export const useAppApi = () => useContext(apiContext);

function useProvideApi() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [addFilters, setAddFilters] = useState(false);
  const [sort, setSort] = useState('followers');
  const [order, setOrder] = useState('desc');
  const [results, setResults] = useState({ items: [] });
  const [makeApiCall, setMakeApiCall] = useState(false);
  const authToken = process.env.REACT_APP_GITHUB_TOKEN;
  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'token ' + authToken,
    },
  };

  const applyNewSearch = (params) => {
    setSearchTerm(params.searchTerm);
    setPerPage(params.perPage);
    setAddFilters(params.addFilters);
    if (params.addFilters) {
      setOrder(params.order);
      setSort(params.sort);
    }
    setPage(1);
    setMakeApiCall(true);
  };

  const updatePage = (p) => {
    setPage(Number(p));
    setMakeApiCall(true);
  };

  const callApiSearchUsers = () => {
    let route = `https://api.github.com/search/users?q=${searchTerm}&per_page=${perPage}&page=${page}`;
    if (addFilters) {
      route += `&sort=${sort}&order=${order}`;
    }

    return fetch(route, headers)
      .then((response) => response.json())
      .then((res) => {
        if (res.total_count) {
          setResults(res);
        } else {
          setResults({ items: [] });
        }
        setMakeApiCall(false);
        return res;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const callUsersInfoUrl = (url) =>
    fetch(url, headers)
      .then((response) => response.json())
      .then((res) => res)
      .catch((error) => {
        console.error('Error:', error);
      });

  return {
    searchTerm,
    page,
    perPage,
    addFilters,
    sort,
    order,
    results,
    applyNewSearch,
    callApiSearchUsers,
    updatePage,
    makeApiCall,
    callUsersInfoUrl,
  };
}

export function ProvideApi({ children }) {
  const api = useProvideApi();
  return <apiContext.Provider value={api}>{children}</apiContext.Provider>;
}
