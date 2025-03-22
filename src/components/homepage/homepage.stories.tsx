import { Meta, StoryObj } from '@storybook/react';
import { GoToShopButton } from './go-to-shop-button';

const meta: Meta<typeof GoToShopButton> = {
  title: 'Homepage',
  component: GoToShopButton,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof GoToShopButton>;

export const Default: Story = {};
