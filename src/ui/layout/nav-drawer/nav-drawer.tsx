'use client';

import { useNavDrawer } from '@/ui/store';
import { NavDrawerLayout } from './nav-drawer-layout';
import { Category } from '@/core/category';
import { NavLinks } from './nav-links';

interface NavDrawerProps {
  categories?: Category[];
}

export function NavDrawer({ categories }: NavDrawerProps) {
  const { isOpen, close } = useNavDrawer();

  return (
    <NavDrawerLayout isOpen={isOpen} onClose={close}>
      <NavLinks categories={categories} onClose={close} />
    </NavDrawerLayout>
  );
}
