import { Meta, StoryObj } from '@storybook/react';
import { ProductPageView } from './product-page-view';
import {
  productWithoutImages,
  productWithOneImage,
  productWithManyImages,
} from '@/fixtures/products';
import { AppLayout } from '@/ui/components/app-layout/app-layout';

const meta = {
  title: 'Product/ProductPageView',
  component: ProductPageView,
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
} satisfies Meta<typeof ProductPageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithManyImages: Story = {
  args: {
    product: productWithManyImages,
  },
};

export const WithOneImage: Story = {
  args: {
    product: productWithOneImage,
  },
};

export const WithoutImages: Story = {
  args: {
    product: productWithoutImages,
  },
};
