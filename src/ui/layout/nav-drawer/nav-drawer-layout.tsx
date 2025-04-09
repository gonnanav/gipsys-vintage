import { SideDrawerLayout } from '../side-drawer-layout';

interface NavDrawerLayoutProps {
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}

export function NavDrawerLayout({ isOpen, children, onClose }: NavDrawerLayoutProps) {
  return (
    <SideDrawerLayout
      title="תפריט הניווט"
      closeButtonName="סגרי את תפריט הניווט"
      isOpen={isOpen}
      onClose={onClose}
    >
      {children}
    </SideDrawerLayout>
  );
}
