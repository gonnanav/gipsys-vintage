'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { useNavDrawerActions } from '@/store';
import { HeaderButton } from './header-button';

export function NavigationButton() {
  const { open } = useNavDrawerActions();

  return <HeaderButton ariaLabel="פתחי את תפריט הניווט" Icon={MenuIcon} onClick={open} />;
}
