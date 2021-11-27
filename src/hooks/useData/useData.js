import { useEffect, useState, useCallback } from 'react';
import { getApiData } from '../../api/getApiData/getApiData';

export const useData = () =>
{
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(-1);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);

  const updateData = useCallback(() =>
  {
    if (!isLoading) return;
    if (total > -1 && rows.length >= total) return;
    getApiData(page).then(apiResult =>
    {
      const newRows = apiResult.rows.map((row, id) => ({ ...row, id: id + rows.length }));
      setRows(rows => [...rows, ...newRows]);
      setTotal(apiResult.total);
      setIsLoading(false);
    });
  }, [isLoading, total, rows.length]);

  useEffect(updateData, [isLoading]);

  useEffect(() => page && setIsLoading(true), [page]);

  const loadNext = useCallback(() =>
  {
    if (isLoading) return;
    setPage(page => page + 1);
  }, [isLoading]);

  return {
    rows,
    total,
    loadNext
  };
}