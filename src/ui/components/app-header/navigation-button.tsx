'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { HeaderButton } from './header-button';

export function NavigationButton() {
  return (
    <HeaderButton
      testId="navigation-menu-button"
      ariaLabel="פתחי את תפריט הניווט"
      Icon={MenuIcon}
      onClick={() => {}}
    />
  );
}
