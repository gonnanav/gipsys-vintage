import { Meta, StoryObj } from '@storybook/react';
import { ProductPageView } from './product-page-view';
import { cottonScarf, puffSleeveTop, leatherJacket } from '@/fixtures/products';
import { AppLayout } from '@/ui/components/app-layout/app-layout';

const meta = {
  title: 'Product/ProductPageView',
  component: ProductPageView,
  parameters: {
    layout: 'fullscreen',
  },
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
    product: leatherJacket,
  },
};

export const WithOneImage: Story = {
  args: {
    product: puffSleeveTop,
  },
};

export const WithoutImages: Story = {
  args: {
    product: cottonScarf,
  },
};
