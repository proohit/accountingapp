import dayjs from 'dayjs';

export const convertJSDateToMySQLDate = (dateToConvert: Date): string => {
    return dateToConvert.toISOString().slice(0, 19).replace('T', ' ');
};

export const getDaysInMonth = (month: number, year: number, format?: string) => {
    const daysInMonth = dayjs()
        .year(year)
        .month(month - 1)
        .daysInMonth();
    const daysStatistics = [];
    for (let day = 1; day <= daysInMonth; day++) {
        daysStatistics.push(
            dayjs()
                .year(year)
                .month(month - 1)
                .date(day)
                .format(format || 'YYYY-MM-DD'),
        );
    }
    return daysStatistics;
};
