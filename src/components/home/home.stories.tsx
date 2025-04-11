import type { Meta, StoryObj } from '@storybook/react';
import { HomePage } from '@/components/home';

const meta: Meta<typeof HomePage> = {
  title: 'Homepage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {};
