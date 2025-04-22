import { test as setup } from '@playwright/test';
import { Category, CategoryCreate } from '@/core/category';
import { Product, ProductCreate } from '@/core/product';
import { wcService } from '@/services';
import { parseCategoriesIds, parseCategoriesBatchUpdate } from '@/transformers/category';
import { parseProductsBatchUpdate, parseProductsIds } from '@/transformers/product';
import { toWooCommerceProductInput } from '@/transformers/woocommerce/product';
import {
  shirtsCategory as shirtsCategoryFixture,
  pantsCategory as pantsCategoryFixture,
  whiteTShirt as whiteTShirtFixture,
  blueJeans as blueJeansFixture,
  blackPants as blackPantsFixture,
} from './data';

setup('seed store data', async () => {
  const [shirtsCategory, pantsCategory] = await seedCategories([
    shirtsCategoryFixture,
    pantsCategoryFixture,
  ]);

  const whiteTShirt = {
    ...whiteTShirtFixture,
    categoryId: shirtsCategory.id,
  };
  const blueJeans = {
    ...blueJeansFixture,
    categoryId: pantsCategory.id,
  };
  const blackPants = {
    ...blackPantsFixture,
    categoryId: pantsCategory.id,
  };

  await seedProducts([whiteTShirt, blueJeans, blackPants]);
});

async function seedCategories(newCategories: CategoryCreate[]): Promise<Category[]> {
  const rawCategories = await wcService.get('products/categories');
  const oldCategoryIds = parseCategoriesIds(rawCategories);

  await wcService.post('products/categories/batch', {
    delete: oldCategoryIds,
  });
  const rawBatchUpdate = await wcService.post('products/categories/batch', {
    create: newCategories,
  });

  return parseCategoriesBatchUpdate(rawBatchUpdate);
}

async function seedProducts(newProducts: ProductCreate[]): Promise<Product[]> {
  const rawProducts = await wcService.get('products');
  const oldProductIds = parseProductsIds(rawProducts);
  const wcProductInputs = newProducts.map((p, index) =>
    toWooCommerceProductInput({
      ...p,
      sortOrder: index,
    }),
  );

  await wcService.post('products/batch', {
    delete: oldProductIds,
  });
  const rawBatchUpdate = await wcService.post('products/batch', {
    create: wcProductInputs,
  });

  return parseProductsBatchUpdate(rawBatchUpdate);
}
