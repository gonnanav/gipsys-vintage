'use client';

import { useNavDrawerActions } from '@/ui/store';
import { NavButton } from './nav-button';

export function NavButtonAdapter() {
  const { open } = useNavDrawerActions();

  return <NavButton onClick={open} />;
}
