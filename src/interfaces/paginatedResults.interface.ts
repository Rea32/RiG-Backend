export interface PaginatedResult<T> {
    element: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
}