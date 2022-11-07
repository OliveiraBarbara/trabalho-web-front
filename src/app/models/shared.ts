export interface ResponseDataList<T> {
  items: T[];
  meta: {
    totalItens: number;
    itemCount: number;
    itemPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
