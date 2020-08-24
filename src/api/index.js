import { get } from 'axios';

export const URL =
  'https://app-homevision-staging.herokuapp.com/api_project/houses';

export async function fetchApi(page = 0, perPage = 9) {
  return await get(`${URL}?page=${page}&per_page=${perPage}`);
}
