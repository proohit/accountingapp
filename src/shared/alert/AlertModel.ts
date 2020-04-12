export interface Alert {
    /** The message to display */
    message: string;
    /** The type of error to display. Can be one of @enum {Severity} */
    severity: Severity
}

export enum Severity {
    error = "error",
    success = "success",
    info = "info"
}