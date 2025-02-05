import { useMemo } from 'react';

interface UsePaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
}

export const usePagination = ({
  totalCount,
  pageSize,
  currentPage,
}: UsePaginationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const paginationRange = useMemo(() => {
    const range = [];
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  }, [totalPages]);

  return {
    totalPages,
    paginationRange,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    prevPage: currentPage > 1 ? currentPage - 1 : null,
  };
};