import { HeaderLayout } from './header-layout';
import { NavButton } from './nav-button';
import { LogoImage } from './logo-image';
import { CartButtonAdapter } from './cart-button-adapter';

export function Header() {
  return (
    <HeaderLayout>
      <NavButton />
      <LogoImage />
      <CartButtonAdapter />
    </HeaderLayout>
  );
}
