'use client';

import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavDrawer } from '@/store';
import { SideDrawerLayout } from '../side-drawer-layout';

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
          <ListItem>
            <Link href="/shop">חנות</Link>
          </ListItem>
        </List>
      </nav>
    </SideDrawerLayout>
  );
}
