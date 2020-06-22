import { API } from './api-method';

const resource = '/search';

export const getSearch = (payload: string) => API.get(`${resource}?q=${payload}`);

export default { getSearch };
