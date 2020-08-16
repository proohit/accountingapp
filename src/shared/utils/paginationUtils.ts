export const calculateOffset = (page: number, count: number): number => {
    if (page - 1 < 1) return 0;
    return (page - 1) * count;
};
