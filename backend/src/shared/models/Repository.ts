export interface Repository {
    createTable: () => Promise<void>;
    resetTable: () => Promise<void>;
}
