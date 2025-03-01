import { Meta, StoryObj } from '@storybook/react';
import { ShopPageView } from './shop-page-view';
import { productWithManyImages, productWithOneImage } from '@/fixtures/products';
import { AppLayout } from '@/app/components/app-layout/app-layout';

const meta = {
  title: 'Shop/ShopPageView',
  component: ShopPageView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AppLayout>
        <Story />
      </AppLayout>
    ),
  ],
  args: {
    title: 'חנות',
  },
} satisfies Meta<typeof ShopPageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithManyProducts: Story = {
  args: {
    products: [productWithManyImages, productWithOneImage],
  },
};

export const WithOneProduct: Story = {
  args: {
    products: [productWithOneImage],
  },
};

export const WithoutProducts: Story = {
  args: {
    products: [],
  },
};
