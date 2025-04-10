'use client';

import { useNavDrawerActions } from '@/features/store';
import MenuIcon from '@mui/icons-material/Menu';
import { HeaderButton } from './header-button';

export function OpenNavButton() {
  const { open } = useNavDrawerActions();

  return <HeaderButton name="פתחי את תפריט הניווט" Icon={MenuIcon} onClick={open} />;
}
