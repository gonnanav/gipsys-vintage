import type { Meta, StoryObj } from '@storybook/react';
import { ProductGallery } from './product-gallery';
import { productWithOneImage, productWithManyImages } from '@/fixtures/products';

const meta = {
  title: 'Product/ProductGallery',
  component: ProductGallery,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoImages: Story = {
  args: {},
};

export const SingleImage: Story = {
  args: {
    productImages: productWithOneImage.images,
  },
};

export const MultipleImages: Story = {
  args: {
    productImages: productWithManyImages.images,
  },
};

export const ManyImages: Story = {
  args: {
    productImages: productWithManyImages.images,
  },
};

// This story helps test how the gallery handles different aspect ratios
export const DifferentAspectRatios: Story = {
  args: {
    productImages: [
      {
        src: '/product/wide.webp',
        alt: 'Wide product image',
      },
      {
        src: '/product/tall.webp',
        alt: 'Tall product image',
      },
      {
        src: '/product/square.webp',
        alt: 'Square product image',
      },
    ],
  },
};
