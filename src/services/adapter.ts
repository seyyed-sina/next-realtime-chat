import { apiEndpoints } from '@constants';
import { LocalResponse } from '@types';

export const fetchData = async <T>(
  url: string,
  config?: RequestInit,
): Promise<LocalResponse<T>> => {
  const BASE_URL = apiEndpoints.BASE_URL;

  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    ...config,
  };

  const api_url = `${BASE_URL}${url}`;

  const res = await fetch(api_url, options);
  console.log('local res ===============>: ', res);
  return (await res.json()) as LocalResponse<T>;
};

export const mutateData = async <T>(url: string, config?: RequestInit) => {
  const res = await fetchData<T>(url, { method: 'POST', ...config });
  console.log('res ========================>: ', res);
  return res;
};
