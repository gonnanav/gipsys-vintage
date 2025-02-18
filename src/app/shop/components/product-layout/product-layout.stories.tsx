import { Meta, StoryObj } from '@storybook/react';
import { ProductLayout } from './product-layout';
import Box from '@mui/material/Box';

const meta = {
  title: 'Shop/ProductLayout',
  component: ProductLayout,
} satisfies Meta<typeof ProductLayout>;

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
    title: 'חנות',
    children,
  },
};
