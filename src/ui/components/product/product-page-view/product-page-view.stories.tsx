import { Meta, StoryObj } from '@storybook/react';
import { ProductPageView } from './product-page-view';
import { cottonScarf, puffSleeveTop, leatherJacket } from '@/fixtures/products';

const meta = {
  title: 'Product Page',
  component: ProductPageView,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProductPageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LeatherJacket: Story = {
  args: {
    product: leatherJacket,
  },
};

export const PuffSleeveTop: Story = {
  args: {
    product: puffSleeveTop,
  },
};

export const CottonScarf: Story = {
  args: {
    product: cottonScarf,
  },
};
