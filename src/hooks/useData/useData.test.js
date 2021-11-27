import { renderHook, act } from '@testing-library/react-hooks';
import * as apiDataDepdendency from '../../api/getApiData/getApiData';
import { useData } from "./useData";

describe('useData hook', () =>
{
  const apiResponse = {
    total: 500,
    rows: [{ name: 'name1' }, { name: 'name2' }, { name: 'name3' }]
  }
  let result;
  beforeEach(() =>
  {
    jest.spyOn(apiDataDepdendency, 'getApiData').mockResolvedValue(apiResponse);
    result = renderHook(useData).result;
  });
  describe('basic return', () =>
  {
    it('should return rows as array', () =>
    {
      expect(result.current.rows).toEqual([]);
    });
    it('should return total as number', () =>
    {
      expect(result.current.total).toBe(-1);
    });
    it('should return loadNext as method', () =>
    {
      expect(result.current.loadNext instanceof Function).toBe(true);
    });
  });

  describe('after first refresh', () =>
  {
    it('should call the api by passing the page 1', async () =>
    {
      await act(async () => await result.current.loadNext());
      expect(apiDataDepdendency.getApiData).toHaveBeenCalledWith(1);
    });
    it('should upload the total param', async () =>
    {
      await act(async () => await result.current.loadNext());
      expect(result.current.total).toBe(apiResponse.total);
    });

    it('should upload the rows param', async () =>
    {
      await act(async () => await result.current.loadNext());
      expect(result.current.rows).toEqual([
        { id: 0, name: 'name1' },
        { id: 1, name: 'name2' },
        { id: 2, name: 'name3' }
      ]);
    });
  });

  describe('after more refreshses', () =>
  {
    it('should call the api by passing the correct page', async () =>
    {
      await act(async () => await result.current.loadNext());
      expect(apiDataDepdendency.getApiData).toHaveBeenCalledWith(1);
      apiDataDepdendency.getApiData.mockReset();
      await act(async () => await result.current.loadNext());
      expect(apiDataDepdendency.getApiData).toHaveBeenCalledWith(2);
    });
    it('should keep the value of the total param', async () =>
    {
      await act(async () => await result.current.loadNext());
      expect(result.current.total).toBe(apiResponse.total);
    });
    it('should concatenate the results', async () =>
    {
      await act(async () => await result.current.loadNext());
      await act(async () => await result.current.loadNext());
      expect(result.current.rows).toEqual([
        { id: 0, name: 'name1' },
        { id: 1, name: 'name2' },
        { id: 2, name: 'name3' },
        { id: 3, name: 'name1' },
        { id: 4, name: 'name2' },
        { id: 5, name: 'name3' }
      ]);
    });
  });
});