export const WinstonLogLevel: string[] = [
    "error",
    "warn",
    "info",
    "http",
    "verbose",
    "debug",
    "silly",
];

export enum Errors {
    InternalServerError = "Internal server error",
    InvalidPageNumber = "Invalid page number",
    InvalidPageLimit = "Invalid page limit",
    InvalidCursor = "Invalid cursor",
}

export enum SuccessMessages {
    Success = "Success",
    GetUsers = "Successfully get users",
}
