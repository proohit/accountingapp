import { ParsedUrlQuery } from 'querystring';

export const parseIntQuery = (field: string | string[]): number => {
    return parseInt(Array.isArray(field) ? field[0] : field, 10);
};

export const getFirstValue = (field: string | string[]) => {
    return Array.isArray(field) ? field[0] : field;
};

export const parseQuery = (query: ParsedUrlQuery) => {
    const parsedQuery: { [field in string]: string } = {};

    Object.keys(query).forEach((queryField) => {
        if (Array.isArray(query[queryField]) && query[queryField]?.length > 0) {
            parsedQuery[queryField] = query[queryField][0];
        } else {
            parsedQuery[queryField] = query[queryField] as string;
        }
    });

    return parsedQuery;
};
