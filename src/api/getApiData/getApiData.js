import constants from "../../constants";

const headers = {
  Authorization: `BASIC ${constants.PERMISSION_EMAIL}`
};

export const getApiData = async (page) =>
{
  const url = `${constants.API_END_POINT}?perPage=${constants.ITEM_PER_REQUEST}&page=${page}`;
  const response = await fetch(url, { headers });
  return response.json();
};