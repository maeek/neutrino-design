import {useState, useEffect, useCallback} from 'react';

export const usePagination = (array: unknown[], perPage = 20) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState<unknown[]>([]);

  useEffect(() => {
    const startIndex = currentPage * perPage;
    const endIndex = startIndex + perPage;
    const newPage = array.slice(startIndex, endIndex);
    setPage(newPage);
  }, [array, currentPage, perPage]);

  const nextPage = useCallback(() => {
    const arrayLength = array.length;

    if (currentPage + 1 < Math.ceil(arrayLength / perPage)) {
      setCurrentPage(currentPage + 1);
    }

  }, [currentPage, perPage, array]);

  const prevPage = useCallback(() => {
    if (currentPage - 1 >= 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, perPage, array]);

  const goToPage = useCallback((pageNumber: number) => {
    const arrayLength = array.length;

    if (pageNumber >= 0 && pageNumber < Math.ceil(arrayLength / perPage)) {
      setCurrentPage(pageNumber);
    }
  }, [currentPage, perPage, array]);

  return {
    page,
    currentPage,
    nextPage,
    prevPage,
    goToPage
  };
};
