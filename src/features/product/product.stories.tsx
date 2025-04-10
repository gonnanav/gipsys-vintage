import { Meta, StoryObj } from '@storybook/react';
import { ProductPage, ProductPageLoading } from '@/features/product';
import { cottonScarf, puffSleeveTop, leatherJacket } from '@/fixtures/products';

const meta = {
  title: 'Product Page',
  component: ProductPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProductPage>;

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

export const Loading: Story = {
  render: () => <ProductPageLoading />,
  args: {
    product: leatherJacket,
  },
};
