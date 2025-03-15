import { Meta, StoryObj } from '@storybook/react';
import { ShopLayout } from './shop-layout';
import Box from '@mui/material/Box';

const meta = {
  title: 'Shop/ShopLayout',
  component: ShopLayout,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ShopLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'חנות',
    children: <Box sx={{ backgroundColor: 'grey', width: '100%', aspectRatio: '3 / 4' }} />,
  },
};
