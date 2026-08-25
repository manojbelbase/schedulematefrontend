export type PaginationDTO = {
  previousPage?: number | null;
  nextPage?: number | null;
  total: number;
  count: number;
};

export type PaginatedResponseDTO<T> = {
  message: string;
  data: T[];
  pagination: PaginationDTO;
};

export const DEFAULT_PAGINATION_FILTER = {
  take: 25,
  page: 0,
};

export const withDefaultPagination = <T>(params: object): T => {
  return {
    ...params,
    take:
      "take" in params && Number(params.take) >= 0
        ? Number(params.take)
        : Number(DEFAULT_PAGINATION_FILTER.take),
    page:
      "page" in params && Number(params.page) >= 0
        ? Number(params.page)
        : Number(DEFAULT_PAGINATION_FILTER.page),
  } as T;
};
