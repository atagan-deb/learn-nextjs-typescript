import useSWR from 'swr';
import type { ApiContext, Category, Condition, Product } from 'types';

export type UseSearchProps = {
  /**
   * 商品カテゴリ
   */
  category?: Category;
  /**
   * 商品状態
   */
  conditions?: Condition[];
  /**
   * 所有ユーザーID
   */
  userId?: number;
  /**
   * ソートキー
   */
  sort?: keyof Omit<Product, 'owner'>;
  /**
   * 昇順or降順
   */
  order?: 'asc' | 'desc';
  /**
   * 商品初期状態
   */
  initial?: Product[];
};

export type UseSearch = {
  /**
   * 検索にヒットした商品リスト
   */
  products: Product[];
  /**
   * ロードフラグ
   */
  isLoading: boolean;
  /**
   * エラーフラグ
   */
  isError: boolean;
};

/**
 *
 * @param context APIコンテキスト
 * @param param1 (category)商品カテゴリ：検索条件
 * @param param2 (userId)所有ユーザーID：検索条件
 * @param param3 (conditions)商品状態：検索条件
 * @param param4 (initial)商品初期状態：検索条件
 * @param param5 (sort)ソートキー：検索条件
 * @param param6 (order)昇順or降順：検索条件
 * @returns
 */
const useSearch = (
  context: ApiContext,
  {
    category,
    userId,
    conditions,
    initial,
    sort = 'id',
    order = 'desc',
  }: UseSearchProps = {},
): UseSearch => {
  const path = `${context.apiRootUrl.replace(/\$/g, '')}/products`;
  const params = new URLSearchParams();

  category && params.append('category', category);
  userId && params.append('owner.id', `${userId}`);
  conditions &&
    conditions.forEach((condition) => params.append('condition', condition));
  sort && params.append('_sort', sort);
  order && params.append('_order', order);

  const query = params.toString();
  const { data, error } = useSWR<Product[]>(
    query.length > 0 ? `${path}?${query}` : path,
  );

  return {
    products: data ?? initial ?? [],
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useSearch;
