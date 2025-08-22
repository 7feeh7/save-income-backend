
export interface PaginationParams {
    page: number
    pageSize: number
}

export interface PaginationResult {
    offset: number
    limit: number
}

export const calculatePagination = ({
    page,
    pageSize
}: PaginationParams): PaginationResult => {
    const offset = (page - 1) * pageSize
    const limit = pageSize
    return { offset, limit }
}
