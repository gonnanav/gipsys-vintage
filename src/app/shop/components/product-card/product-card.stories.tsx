import { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './product-card';
import { productWithoutImages, productWithOneImage } from '@/fixtures/products';
const meta = {
  title: 'Shop/ProductCard',
  component: ProductCard,
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    product: productWithOneImage,
  },
};

export const WithoutImage: Story = {
  args: {
    product: productWithoutImages,
  },
};
