import { SideDrawerLayout } from '../side-drawer-layout';

export interface NavDrawerProps {
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
}

export function NavDrawer({ isOpen, children, onClose }: NavDrawerProps) {
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
