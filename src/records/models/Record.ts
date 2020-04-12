export default interface Record {
    id?: number;
    description: string;
    value: number;
    timestamp: string;
    wallet: string;
    owner?: string;
}