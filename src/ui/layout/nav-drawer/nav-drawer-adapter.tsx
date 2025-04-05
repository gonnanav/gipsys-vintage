'use client';

import { useNavDrawer } from '@/ui/store';
import { NavDrawer } from './nav-drawer';
import { Category } from '@/core/category';
import { NavLinks } from './nav-links';

export interface NavDrawerAdapterProps {
  categories?: Category[];
}

export function NavDrawerAdapter({ categories }: NavDrawerAdapterProps) {
  const { isOpen, close } = useNavDrawer();

  return (
    <NavDrawer isOpen={isOpen} onClose={close}>
      <NavLinks categories={categories} onClose={close} />
    </NavDrawer>
  );
}
