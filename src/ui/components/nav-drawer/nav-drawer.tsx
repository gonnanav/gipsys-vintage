'use client';

import { useNavDrawer } from '@/store';

export function NavDrawer() {
  const { isOpen } = useNavDrawer();

  return isOpen ? <nav /> : null;
}
