import type { ApiContext, Category, Condition, Product } from 'types';
import { fetcher } from 'utils';

export type GetAllProductsParams = {
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
   * 最大取得数
   */
  limit?: number;
  /**
   * ページ数
   */
  page?: number;
};

/**
 * 商品API（一覧取得）
 * @param context APIコンテキスト
 * @param param1 （category）商品カテゴリ:検索条件
 * @param param2 （conditions）商品状態:検索条件
 * @param param3 （userId）所有ユーザーID:検索条件
 * @param param4 （page）取得ページ数:検索条件
 * @param param5 （limit）最大取得数:検索条件
 * @param param6 （sort）ソートキー:検索条件
 * @param param7 （order）昇順or降順:検索条件
 * @returns 商品一覧
 */
// eslint-disable-next-line complexity
const getAllProducts = async (
  context: ApiContext,
  {
    category,
    conditions,
    userId,
    page,
    limit,
    sort = 'id',
    order = 'desc',
  }: GetAllProductsParams = {},
): Promise<Product[]> => {
  const path = `${context.apiRootUrl.replace(/\$/g, '')}/products`;
  const params = new URLSearchParams();

  category && params.append('category', category);
  conditions &&
    conditions.forEach((condition) => params.append('condition', condition));
  userId && params.append('owner.id', `${userId}`);
  page && params.append('_page', `${page}`);
  limit && params.append('_limit', `${limit}`);
  sort && params.append('_sort', `${sort}`);
  order && params.append('_order', `${order}`);
  const query = params.toString();

  return await fetcher(query.length > 0 ? `${path}?${query}` : path, {
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
  });
};

export default getAllProducts;
