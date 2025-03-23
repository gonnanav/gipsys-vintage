import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { NavDrawer } from './nav-drawer';
import { StoreProvider } from '@/store';
import { accessoriesCategory, topsCategory } from '@/fixtures/categories';

const meta: Meta<typeof NavDrawer> = {
  title: 'Navigation Drawer',
  component: NavDrawer,
  decorators: [
    (Story) => (
      <StoreProvider initialState={{ isNavDrawerOpen: true }}>
        <Story />
      </StoreProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NavDrawer>;

export const WithCategories: Story = {
  args: {
    categories: [accessoriesCategory, topsCategory],
  },
};

export const WithoutCategories: Story = {
  args: {
    categories: [],
  },
};
