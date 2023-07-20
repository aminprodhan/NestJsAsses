export interface PaginationResultInterface<PaginationEntity> {
  results: PaginationEntity[];
  total: number;
  //perPage:number;
  next?: string;
  previous?: string;
}
