import type { Meta, StoryObj } from '@storybook/react';
import { ProductGallery } from './product-gallery';

const meta = {
  title: 'Product/ProductGallery',
  component: ProductGallery,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoImages: Story = {
  args: {},
};
