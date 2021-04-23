import { AccHeaderBuilder } from '../services/AccHeaderBuilder';
import { Error } from './Error';

export interface HttpService {
  get: <R>(url: string, query?: string[][]) => Promise<R>;
  post: <C = {}, R = {}>(url: string, body: C) => Promise<R>;
  put: <C = {}, R = {}>(url: string, body: C) => Promise<R>;
  delete: <R>(url: string) => Promise<R>;
}

export const BASE_API: HttpService = {
  get: async <R>(url: string, query?: string[][]): Promise<R> => {
    const headerBuilder = new AccHeaderBuilder();
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
      credentials: 'include',
    });
    const json = await res.json();
    if (!res.ok) {
      const error: Error = {
        status: res.status,
        message: json?.message || 'Unexpected Error',
      };
      throw error;
    } else {
      return json;
    }
  },
  post: async <C, R>(url: string, body: C): Promise<R> => {
    const headerBuilder = new AccHeaderBuilder();

    const fetchConfig: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headerBuilder.getHeader(),
      credentials: 'include',
    };

    const res = await fetch(`${url}`, fetchConfig);
    const json = await res.json();
    if (!res.ok) {
      const error: Error = {
        status: res.status,
        message: json?.message || 'Unexpected Error',
      };
      throw error;
    } else {
      return json;
    }
  },
  put: async <C, R>(url: string, body: C): Promise<R> => {
    const headerBuilder = new AccHeaderBuilder();

    const res = await fetch(`${url}`, {
      method: 'PUT',
      headers: headerBuilder.getHeader(),
      body: JSON.stringify(body),
      credentials: 'include',
    });
    const json = await res.json();
    if (!res.ok) {
      const error: Error = {
        status: res.status,
        message: json?.message || 'Unexpected Error',
      };
      throw error;
    } else {
      return json;
    }
  },
  delete: async <R>(url: string): Promise<R> => {
    const headerBuilder = new AccHeaderBuilder();

    const res = await fetch(`${url}`, {
      method: 'DELETE',
      headers: headerBuilder.getHeader(),
      credentials: 'include',
    });
    const json = await res.json();
    if (!res.ok) {
      const error: Error = {
        status: res.status,
        message: json?.message || 'Unexpected Error',
      };
      throw error;
    } else {
      return json;
    }
  },
};
