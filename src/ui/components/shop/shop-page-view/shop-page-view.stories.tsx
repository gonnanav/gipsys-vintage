import { Meta, StoryObj } from '@storybook/react';
import { ShopPageView } from './shop-page-view';
import Loading from '@/app/shop/loading';
import { leatherJacket, puffSleeveTop, cottonScarf } from '@/fixtures/products';

const meta = {
  title: 'Shop Page',
  component: ShopPageView,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: 'חנות',
  },
} satisfies Meta<typeof ShopPageView>;

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
  render: () => <Loading />,
  args: {
    products: [],
  },
};
