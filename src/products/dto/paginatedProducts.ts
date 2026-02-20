import { Products } from '../products.model';
export interface PaginatedProducts {
  data: Products[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}
