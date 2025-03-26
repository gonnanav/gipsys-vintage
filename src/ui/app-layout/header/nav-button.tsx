'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { useNavDrawerActions } from '@/ui/store';
import { HeaderButton } from './header-button';

export function NavButton() {
  const { open } = useNavDrawerActions();

  return <HeaderButton name="פתחי את תפריט הניווט" Icon={MenuIcon} onClick={open} />;
}
