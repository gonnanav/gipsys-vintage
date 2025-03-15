import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { ProductLayout } from './product-layout';

const meta = {
  title: 'Product/ProductLayout',
  component: ProductLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock components with different heights to showcase layout behavior
const HEIGHTS = {
  standard: 400,
  tall: 600,
} as const;

const COLORS = {
  gallery: '#e3f2fd',
  details: '#fff3e0',
  button: '#e8f5e9',
} as const;

const createBox = ({
  height,
  bgcolor,
  children,
}: {
  height: number;
  bgcolor: string;
  children: string;
}) => (
  <Box
    sx={{
      height,
      width: '100%',
      bgcolor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      typography: 'h6',
    }}
  >
    {children}
  </Box>
);

const tallGallery = createBox({
  height: HEIGHTS.tall,
  bgcolor: COLORS.gallery,
  children: 'Tall Gallery',
});

const standardGallery = createBox({
  height: HEIGHTS.standard,
  bgcolor: COLORS.gallery,
  children: 'Standard Gallery',
});

const standardDetails = createBox({
  height: HEIGHTS.standard,
  bgcolor: COLORS.details,
  children: 'Product Details',
});

const tallDetails = createBox({
  height: HEIGHTS.tall,
  bgcolor: COLORS.details,
  children: 'Tall Details',
});

const addToCartButton = createBox({
  height: 48,
  bgcolor: COLORS.button,
  children: 'Add to Cart Button',
});

export const Default: Story = {
  args: {
    productGallery: standardGallery,
    productDetails: standardDetails,
    addToCartButton,
  },
};

export const TallGallery: Story = {
  args: {
    productGallery: tallGallery,
    productDetails: standardDetails,
    addToCartButton,
  },
};

export const TallDetails: Story = {
  args: {
    productGallery: standardGallery,
    productDetails: tallDetails,
    addToCartButton,
  },
};

export const Mobile: Story = {
  args: {
    productGallery: standardGallery,
    productDetails: standardDetails,
    addToCartButton,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Tablet: Story = {
  args: {
    productGallery: standardGallery,
    productDetails: standardDetails,
    addToCartButton,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};
