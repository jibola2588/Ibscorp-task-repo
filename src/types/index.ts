
export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  }
  
  export interface PaginationParams {
    page: number;
    limit: number;
  }
  
  export interface SortParams {
    field: string;
    direction: 'asc' | 'desc';
  }
  
  export interface FilterParams {
    search: string;
  }
  
  export type QueryParams = PaginationParams & SortParams & FilterParams;