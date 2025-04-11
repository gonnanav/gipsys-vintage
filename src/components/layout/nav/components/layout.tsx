import { DrawerLayout } from '@/components/layout/components/drawer-layout';

interface NavDrawerLayoutProps {
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}

export function NavDrawerLayout({ isOpen, children, onClose }: NavDrawerLayoutProps) {
  return (
    <DrawerLayout
      title="תפריט הניווט"
      closeButtonName="סגרי את תפריט הניווט"
      isOpen={isOpen}
      onClose={onClose}
    >
      {children}
    </DrawerLayout>
  );
}
