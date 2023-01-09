import type { ApiContext, Product } from 'types';
import { fetcher } from 'utils';

export type AddProductParams = {
  /**
   * 追加商品
   */
  product: Omit<Product, 'id'>;
};

/**
 * 商品API（新規追加）
 * @param context APIコンテキスト
 * @param param1 (product) 新規追加商品
 * @returns 新規追加した商品
 */
const addProduct = async (
  context: ApiContext,
  { product }: AddProductParams,
): Promise<Product> => {
  return await fetcher(`${context.apiRootUrl.replace(/\$/g, '')}/products`, {
    method: 'POST',
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
    body: JSON.stringify(product),
  });
};

export default addProduct;
