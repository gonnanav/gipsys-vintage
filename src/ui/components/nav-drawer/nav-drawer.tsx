'use client';

import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavDrawer } from '@/store';
import { SideDrawerLayout } from '../side-drawer-layout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export function NavDrawer() {
  const { isOpen, close } = useNavDrawer();

  return (
    <SideDrawerLayout
      title="תפריט הניווט"
      closeButtonName="סגרי את תפריט הניווט"
      isOpen={isOpen}
      onClose={close}
    >
      <nav>
        <List>
          <NavItem href="/shop">חנות</NavItem>
        </List>
      </nav>
    </SideDrawerLayout>
  );
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

function NavItem({ href, children }: NavItemProps) {
  return (
    <ListItem>
      <ListItemButton component={Link} href={href}>
        <ListItemText>{children}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
