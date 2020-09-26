export interface HttpService {
  get: <R>(url: string, token: string, query?: string[][]) => Promise<R>;
  post: <C, R>(url: string, body: C, token: string) => Promise<R>;
  put: <C, R>(url: string, body: C, token: string) => Promise<R>;
  delete: <R>(url: string, token: string) => Promise<R>;
}

const buildHeaders = () => {};

export const BASE_API: HttpService = {
  get: async <R>(
    url: string,
    token: string,
    query?: string[][]
  ): Promise<R> => {
    const res = await fetch(
      `${url}?${query
        ?.map((singleQuery) => `${singleQuery[0]}=${singleQuery[1]}`)
        .join('&')}`,
      { method: 'GET', headers: [['Authorization', token]] }
    );
    return await res.json();
  },
  post: async <C, R>(url: string, body: C, token: string): Promise<R> => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (token) headers.append('Authorization', token);

    const fetchConfig: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    };

    const res = await fetch(`${url}`, fetchConfig);
    return await res.json();
  },
  put: async <C, R>(url: string, body: C, token: string): Promise<R> => {
    const res = await fetch(`${url}`, {
      method: 'PUT',
      headers: [['Authorization', token]],
      body: JSON.stringify(body),
    });
    return await res.json();
  },
  delete: async <R>(url: string, token: string): Promise<R> => {
    const res = await fetch(`${url}`, {
      method: 'DELETE',
      headers: [['Authorization', token]],
    });
    return await res.json();
  },
};
