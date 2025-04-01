'use client';

import { useNavDrawer } from '@/ui/store';
import { NavDrawer } from './nav-drawer';
import { Category } from '@/core/category';

export interface NavDrawerAdapterProps {
  categories?: Category[];
}

export function NavDrawerAdapter({ categories }: NavDrawerAdapterProps) {
  const { isOpen, close } = useNavDrawer();

  return <NavDrawer categories={categories} isOpen={isOpen} onClose={close} />;
}
