import { Category } from '@/core/category';
import { SideDrawerLayout } from '../side-drawer-layout';
import { NavLinks } from './nav-links';

export interface NavDrawerProps {
  categories?: Category[];
  isOpen: boolean;
  onClose: () => void;
}

export function NavDrawer({ categories, isOpen, onClose }: NavDrawerProps) {
  return (
    <SideDrawerLayout
      title="תפריט הניווט"
      closeButtonName="סגרי את תפריט הניווט"
      isOpen={isOpen}
      onClose={onClose}
    >
      <NavLinks categories={categories} onClose={onClose} />
    </SideDrawerLayout>
  );
}
