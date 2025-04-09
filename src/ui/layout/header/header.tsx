import { HeaderLayout } from './header-layout';
import { OpenNavButton } from './open-nav-button';
import { LogoImage } from './logo-image';
import { OpenCartButton } from './open-cart-button';

export function Header() {
  return (
    <HeaderLayout>
      <OpenNavButton />
      <LogoImage />
      <OpenCartButton />
    </HeaderLayout>
  );
}
