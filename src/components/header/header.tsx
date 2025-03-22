import { HeaderLayout } from './header-layout';
import { NavigationButton } from './navigation-button';
import { LogoImage } from './logo-image';
import { CartButton } from './cart-button';

export function Header() {
  return (
    <HeaderLayout>
      <NavigationButton />
      <LogoImage />
      <CartButton />
    </HeaderLayout>
  );
}
