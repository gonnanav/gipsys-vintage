import { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './product-card';

const meta = {
  title: 'Shop/ProductCard',
  component: ProductCard,
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: {
      id: 1,
      name: 'סריג לבן',
      slug: 'סריג-לבן',
      price: '150',
      images: [{ src: '/product/סריג-לבן.webp' }],
    },
  },
};
