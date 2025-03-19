'use client';

import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavDrawer } from '@/store';

export function NavDrawer() {
  const { isOpen } = useNavDrawer();

  return (
    <Drawer role="dialog" aria-modal="true" open={isOpen}>
      <nav>
        <div>תפריט הניווט</div>
        <List>
          <ListItem>
            <Link href="/shop">חנות</Link>
          </ListItem>
        </List>
      </nav>
    </Drawer>
  );
}
