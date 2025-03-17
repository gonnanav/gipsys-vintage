import type { Meta, StoryObj } from '@storybook/react';
import {
  productWithManyImages,
  productWithOneImage,
  productWithoutImages,
} from '@/fixtures/products';
import { ShoppingCartDrawer } from './shopping-cart-drawer';
import { AppStoreProvider } from '@/ui/providers/app-store-provider/app-store-provider';

const meta: Meta<typeof ShoppingCartDrawer> = {
  title: 'Global/ShoppingCartDrawer',
  component: ShoppingCartDrawer,
  parameters: {
    layout: 'centered',
  },
  args: {
    isOpen: true,
  },
};

export default meta;
type Story = StoryObj<typeof ShoppingCartDrawer>;
const products = [productWithManyImages, productWithOneImage, productWithoutImages];

export const NonEmptyCart: Story = {
  decorators: [
    (Story) => (
      <AppStoreProvider initialState={{ cartItems: products }}>
        <Story />
      </AppStoreProvider>
    ),
  ],
};

export const EmptyCart: Story = {};
