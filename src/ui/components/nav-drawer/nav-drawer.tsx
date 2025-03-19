'use client';

import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavDrawer } from '@/store';
import { Button } from '@mui/material';

export function NavDrawer() {
  const { isOpen, close } = useNavDrawer();

  return (
    <Drawer role="dialog" aria-modal="true" open={isOpen} onClose={close}>
      <nav>
        <div>תפריט הניווט</div>
        <Button onClick={close}>סגרי את תפריט הניווט</Button>
        <List>
          <ListItem>
            <Link href="/shop">חנות</Link>
          </ListItem>
        </List>
      </nav>
    </Drawer>
  );
}
