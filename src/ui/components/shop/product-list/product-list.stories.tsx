import { Meta, StoryObj } from '@storybook/react';
import { ProductList } from './product-list';
import { ProductCard } from '../product-card/product-card';

const meta = {
  title: 'Shop/ProductList',
  component: ProductList,
} satisfies Meta<typeof ProductList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyProducts: Story = {
  args: {
    products: [],
    ProductComponent: ProductCard,
  },
};
