import { HeaderLayout } from './components/layout';
import { OpenNavButton } from './components/open-nav-button';
import { LogoImage } from './components/logo';
import { OpenCartButton } from './components/open-cart-button';

export function Header() {
  return (
    <HeaderLayout>
      <OpenNavButton />
      <LogoImage />
      <OpenCartButton />
    </HeaderLayout>
  );
}
