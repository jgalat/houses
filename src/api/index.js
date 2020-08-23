import { get } from 'axios';

const URL = 'https://app-homevision-staging.herokuapp.com/api_project/houses';

export default function(page = 0, perPage = 9) {
  return get(`${URL}?page=${page}&per_page=${perPage}`);
}
