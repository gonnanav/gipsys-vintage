import type { Meta, StoryObj } from '@storybook/react';
import { ProductGallery } from './product-gallery';
import { puffSleeveTop, leatherJacket } from '@/fixtures/products';
import Box from '@mui/material/Box';

const meta = {
  title: 'Product/ProductGallery',
  component: ProductGallery,
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
        <Story />
      </Box>
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
    productImages: puffSleeveTop.images,
  },
};

export const MultipleImages: Story = {
  args: {
    productImages: leatherJacket.images,
  },
};
