import type { Meta, StoryObj } from '@storybook/react';
import { ProductDetails } from './product-details';

const meta = {
  title: 'Product/ProductDetails',
  component: ProductDetails,
} satisfies Meta<typeof ProductDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDescription: Story = {
  args: {
    product: {
      id: 1,
      name: 'ג׳קט עור וינטג׳',
      price: '1,299',
      slug: 'vintage-leather-jacket',
      description:
        'ג׳קט עור וינטג׳ משנות ה-70. עשוי מעור איכותי עם פטינה טבעית, רוכסן פליז, וגזרה קלאסית שלעולם לא יוצאת מהאופנה. במצב מעולה למרות גילו.',
    },
  },
};

export const WithoutDescription: Story = {
  args: {
    product: {
      id: 2,
      name: 'ג׳ינס בגזרה גבוהה',
      price: '399',
      slug: 'high-waisted-jeans',
    },
  },
};

export const LongProductName: Story = {
  args: {
    product: {
      id: 3,
      name: 'תיק עור איטלקי בעבודת יד משנות ה-60 עם אבזמי זהב ורקמה מותאמת אישית מבית האופנה גוצ׳י',
      price: '3,999',
      slug: 'vintage-gucci-bag',
      description:
        'תיק נדיר מבית האופנה האיטלקי היוקרתי. מייצג את שיא האיכות והיוקרה של אביזרי האופנה משנות ה-60.',
    },
  },
};
