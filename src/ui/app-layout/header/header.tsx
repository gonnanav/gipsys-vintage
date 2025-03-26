import { HeaderLayout } from './header-layout';
import { NavButton } from './nav-button';
import { LogoImage } from './logo-image';
import { CartButton } from './cart-button';

export function Header() {
  return (
    <HeaderLayout>
      <NavButton />
      <LogoImage />
      <CartButton />
    </HeaderLayout>
  );
}
