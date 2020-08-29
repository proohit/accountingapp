export const convertJSDateToMySQLDate = (dateToConvert: Date): string => {
    return dateToConvert.toISOString().slice(0, 19).replace('T', ' ');
};
