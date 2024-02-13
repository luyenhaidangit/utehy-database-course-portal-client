export interface ApiResult<T> {
    status: boolean | null;
    message: string | null;
    data: T | null;
}
