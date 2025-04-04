import { HeaderLayout } from './header-layout';
import { NavButtonAdapter } from './nav-button-adapter';
import { LogoImage } from './logo-image';
import { CartButtonAdapter } from './cart-button-adapter';

export function Header() {
  return (
    <HeaderLayout>
      <NavButtonAdapter />
      <LogoImage />
      <CartButtonAdapter />
    </HeaderLayout>
  );
}
