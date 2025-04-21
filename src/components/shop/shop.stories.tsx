import { Meta, StoryObj } from '@storybook/react';
import { Product } from '@/core/product';
import { ShopPage, ShopPageLoading } from '@/components/shop';
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
    products: [toProps(leatherJacket), toProps(puffSleeveTop), toProps(cottonScarf)],
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

function toProps(product: Product) {
  const { id, name, slug, formattedPrice, mainImage } = product;
  const href = `/product/${slug}`;
  const price = formattedPrice;
  const imageSrc = mainImage.src;

  return { id, name, imageSrc, href, price };
}
