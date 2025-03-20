import type { Meta, StoryObj } from '@storybook/react';
import { leatherJacket, puffSleeveTop, cottonScarf } from '@/fixtures/products';
import { CartDrawer } from './cart-drawer';
import { StoreProvider } from '@/store';

const meta: Meta<typeof CartDrawer> = {
  title: 'Global/ShoppingCartDrawer',
  component: CartDrawer,
  decorators: [
    (Story) => (
      <StoreProvider initialState={{ isCartDrawerOpen: true }}>
        <Story />
      </StoreProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CartDrawer>;
const products = [leatherJacket, puffSleeveTop, cottonScarf];

export const NonEmptyCart: Story = {
  decorators: [
    (Story) => (
      <StoreProvider initialState={{ cartItems: products, isCartDrawerOpen: true }}>
        <Story />
      </StoreProvider>
    ),
  ],
};

export const EmptyCart: Story = {};
