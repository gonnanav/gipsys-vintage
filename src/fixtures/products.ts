import { Product } from '@/core/product';

export const cottonScarf: Product = {
  id: 1,
  name: 'צעיף כותנה קלאסי',
  slug: 'classic-cotton-scarf',
  price: '120',
  description: 'צעיף כותנה רך בצבע אפור בהיר.',
};

export const puffSleeveTop: Product = {
  id: 2,
  name: 'חולצת פרחים מלמלה',
  slug: 'floral-puff-sleeve-top',
  price: '300',
  description:
    "חולצת פרחים רומנטית עם שרוולי מלמלה נפוחים. הדפס פרחוני צבעוני בגווני סגול, ורוד וירוק. מושלמת לשילוב עם ג'ינס או מכנסיים קצרים.",
  images: [
    {
      src: '/products/floral-puff-sleeve-top.webp',
      alt: "חולצת פרחים עם שרוולי מלמלה בסגנון וינטג'",
    },
  ],
};

export const leatherJacket: Product = {
  id: 3,
  name: "ג'קט עור לבן",
  slug: 'white-leather-jacket',
  price: '800',
  description:
    "ג'קט עור וינטג' בגוון לבן שנהב מרהיב. עיצוב קלאסי עם רוכסן אלכסוני, כיסי צד וצווארון דו-שכבתי. תפירה איכותית עם תשומת לב לפרטים, כולל רוכסנים דקורטיביים בשרוולים וחגורת מותן מתכווננת. העור הרך והאיכותי מעניק מראה יוקרתי ונוח ללבישה. פריט הצהרתי שמשלב אלגנטיות קלאסית עם נגיעה מודרנית.",
  images: [
    {
      src: '/products/white-leather-jacket/white-leather-jacket-1.webp',
      alt: "ג'קט עור לבן - מבט חזיתי",
    },
    {
      src: '/products/white-leather-jacket/white-leather-jacket-2.webp',
      alt: "ג'קט עור לבן - מבט צדדי",
    },
    {
      src: '/products/white-leather-jacket/white-leather-jacket-3.webp',
      alt: "ג'קט עור לבן - מבט מאחור",
    },
    {
      src: '/products/white-leather-jacket/white-leather-jacket-4.webp',
      alt: "ג'קט עור לבן - פרט של הרוכסן והצווארון",
    },
    {
      src: '/products/white-leather-jacket/white-leather-jacket-5.webp',
      alt: "ג'קט עור לבן - פרט של השרוולים והכיסים",
    },
  ],
};

const minimalProduct: Product = {
  id: 4,
  name: 'מוצר מינימלי',
  slug: 'minimal-product',
  price: '100',
};

/**
 * Creates a minimal product whose properties can be overridden and extended.
 *
 * @param props - The product properties to override or extend.
 * @returns A product with the given properties and default values for the rest.
 */
export function createProduct(props: Partial<Product> = {}): Product {
  return {
    ...minimalProduct,
    ...props,
  };
}
