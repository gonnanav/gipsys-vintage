'use client';

import { useNavDrawer } from '@/ui/store';
import { Category } from '@/core/category';
import { NavDrawerLayout } from './components/layout';
import { NavLinks } from './components/links';

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
