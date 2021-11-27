import constants from "../../constants";
import { getApiData } from "./getApiData";

describe('getApiData', () =>
{
  const PAGE = 5;
  const API_RESPONSE = {
    total: 123,
    rows: [{}, {}, {}]
  };
  beforeEach(() =>
  {

    jest.spyOn(global, 'fetch').mockImplementation((n) => Promise.resolve({
      json: () => Promise.resolve(API_RESPONSE)
    }));
  });
  it('should call the fetch with correct params', () =>
  {
    getApiData(PAGE);
    expect(global.fetch)
      .toHaveBeenCalledWith(`${constants.API_END_POINT}?perPage=${constants.ITEM_PER_REQUEST}&page=${PAGE}`, {
        headers: {
          Authorization: `BASIC ${constants.PERMISSION_EMAIL}`
        }
      });
  });

  it('should return the response from API', async () =>
  {
    const response = await getApiData(PAGE);
    expect(response).toBe(API_RESPONSE);
  });
});