import { AccHeaderBuilder } from '../services/AccHeaderBuilder';
import { Error } from './Error';
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

export interface HttpService {
  get<R>(url: string, query?: string[][]): Promise<R>;
  post<C = {}, R = {}>(url: string, body: C): Promise<R>;
  put<C = {}, R = {}>(url: string, body: C): Promise<R>;
  delete<R>(url: string): Promise<R>;
}

class BaseApi implements HttpService {
  private async tryFetch<R>(url: string, options: RequestInit): Promise<R> {
    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok) {
      const error: Error = {
        status: response.status,
        message: json?.message || 'Unexpected Error',
      };
      throw error;
    }
    return json;
  }

  async get<R>(url: string, query?: string[][]): Promise<R> {
    const headerBuilder = new AccHeaderBuilder();
    const httpQuery = query
      ? `?${query
          .filter((singleQuery) => !!singleQuery)
          .map((singleQuery) => `${singleQuery[0]}=${singleQuery[1]}`)
          .join('&')}`
      : '';
    const finalUrl = `${BASE_URL}${url}${httpQuery}`;
    return this.tryFetch<R>(finalUrl, {
      method: 'GET',
      headers: headerBuilder.getHeader(),
      credentials: 'include',
    });
  }
  async post<C, R>(url: string, body: C): Promise<R> {
    const headerBuilder = new AccHeaderBuilder();
    const fetchConfig: RequestInit = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headerBuilder.getHeader(),
      credentials: 'include',
    };
    return this.tryFetch<R>(`${BASE_URL}${url}`, fetchConfig);
  }
  async put<C, R>(url: string, body: C): Promise<R> {
    const headerBuilder = new AccHeaderBuilder();
    return this.tryFetch<R>(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: headerBuilder.getHeader(),
      body: JSON.stringify(body),
      credentials: 'include',
    });
  }
  async delete<R>(url: string): Promise<R> {
    const headerBuilder = new AccHeaderBuilder();
    return this.tryFetch<R>(`${BASE_URL}${url}`, {
      method: 'DELETE',
      headers: headerBuilder.getHeader(),
      credentials: 'include',
    });
  }
}

export const BASE_API = new BaseApi();
