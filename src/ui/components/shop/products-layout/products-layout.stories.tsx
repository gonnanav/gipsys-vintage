import { Meta, StoryObj } from '@storybook/react';
import { ProductsLayout } from './products-layout';
import Box from '@mui/material/Box';

const meta = {
  title: 'Shop/ProductLayout',
  component: ProductsLayout,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProductsLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

const colors = ['black', 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];

const children = Array.from({ length: 10 }).map((_, i) => {
  const backgroundColor = colors[i % colors.length];

  return (
    <Box
      key={i}
      sx={{
        width: '1200px',
        aspectRatio: '3 / 4',
        backgroundColor,
      }}
    />
  );
});

export const Default: Story = {
  args: {
    children,
  },
};
