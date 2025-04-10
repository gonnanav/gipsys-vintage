import { Meta, StoryObj } from '@storybook/react';
import { ShopPage, ShopPageLoading } from '@/features/shop';
import { leatherJacket, puffSleeveTop, cottonScarf } from '@/fixtures/products';

const meta = {
  title: 'Shop Page',
  component: ShopPage,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'חנות',
  },
} satisfies Meta<typeof ShopPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    products: [leatherJacket, puffSleeveTop, cottonScarf],
  },
};

export const Empty: Story = {
  args: {
    products: [],
  },
};

export const LoadingPage: Story = {
  render: () => <ShopPageLoading />,
  args: {
    products: [],
  },
};
