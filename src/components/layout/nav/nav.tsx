'use client';

import { useNavDrawer } from '@/components/store';
import { NavCategory } from '@/components/layout';
import { NavDrawerLayout } from './components/layout';
import { NavLinks } from './components/links';

interface NavDrawerProps {
  categories?: NavCategory[];
}

export function NavDrawer({ categories }: NavDrawerProps) {
  const { isOpen, close } = useNavDrawer();

  return (
    <NavDrawerLayout isOpen={isOpen} onClose={close}>
      <NavLinks categories={categories} onClose={close} />
    </NavDrawerLayout>
  );
}
