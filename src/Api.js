import React, {useState, useContext, createContext} from 'react';

const apiContext = createContext();

export function ProvideApi({ children }) {
  const api = useProvideApi();
  return <apiContext.Provider value={api}>{children}</apiContext.Provider>;
}

export const useAppApi = () => {
  return useContext(apiContext);
};


function useProvideApi() {
  const [searchTerm,setSearchTerm] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage,setPerPage] = useState(10);
  const [addFilters,setAddFilters] = useState(false);
  const [sort,setSort] = useState('followers');
  const [order,setOrder] = useState('desc');
  const [results,setResults] = useState(0);

  return {
    searchTerm,
    page,
    perPage,
    addFilters,
    sort,
    order,
    results
  };
}
