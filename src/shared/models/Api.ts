import { AccHeaderBuilder } from '../services/AccHeaderBuilder';

export interface HttpService {
  get: <R>(url: string, token: string, query?: string[][]) => Promise<R>;
  post: <C, R>(url: string, body: C, token: string) => Promise<R>;
  put: <C, R>(url: string, body: C, token: string) => Promise<R>;
  delete: <R>(url: string, token: string) => Promise<R>;
}

export const BASE_API: HttpService = {
  get: async <R>(
    url: string,
    token: string,
    query?: string[][]
  ): Promise<R> => {
    const headerBuilder = new AccHeaderBuilder(token);
    const httpQuery = query
      ? `?${query
          .filter((singleQuery) => !!singleQuery)
          .map((singleQuery) => `${singleQuery[0]}=${singleQuery[1]}`)
          .join('&')}`
      : '';
    const finalUrl = `${url}${httpQuery}`;
    const res = await fetch(finalUrl, {
      method: 'GET',
      headers: headerBuilder.getHeader(),
    });
    const json = await res.json();
    if (!res.ok) {
      throw json;
    } else {
      return json;
    }
  },
  post: async <C, R>(url: string, body: C, token: string): Promise<R> => {
    const headerBuilder = new AccHeaderBuilder(token);

    const fetchConfig: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headerBuilder.getHeader(),
    };

    const res = await fetch(`${url}`, fetchConfig);
    const json = await res.json();
    if (!res.ok) {
      throw json;
    } else {
      return json;
    }
  },
  put: async <C, R>(url: string, body: C, token: string): Promise<R> => {
    const headerBuilder = new AccHeaderBuilder(token);

    const res = await fetch(`${url}`, {
      method: 'PUT',
      headers: headerBuilder.getHeader(),
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) {
      throw json;
    } else {
      return json;
    }
  },
  delete: async <R>(url: string, token: string): Promise<R> => {
    const headerBuilder = new AccHeaderBuilder(token);

    const res = await fetch(`${url}`, {
      method: 'DELETE',
      headers: headerBuilder.getHeader(),
    });
    const json = await res.json();
    if (!res.ok) {
      throw json;
    } else {
      return json;
    }
  },
};
