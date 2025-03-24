'use client';

import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavDrawer, useNavDrawerActions } from '@/store';
import { SideDrawerLayout } from '../side-drawer-layout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Category } from '@/core/category';
import Divider from '@mui/material/Divider';

export interface NavDrawerProps {
  categories?: Category[];
}

export function NavDrawer({ categories }: NavDrawerProps) {
  const { isOpen, close } = useNavDrawer();

  return (
    <SideDrawerLayout
      title="תפריט הניווט"
      closeButtonName="סגרי את תפריט הניווט"
      isOpen={isOpen}
      onClose={close}
    >
      <nav>
        <List aria-label="תפריט הניווט">
          <NavItem href="/">עמוד הבית</NavItem>
          <NavItem href="/shop">חנות</NavItem>
          <NavItem href="/policy/website">תקנון האתר</NavItem>
          <NavCategoryItems categories={categories} />
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
  const { close } = useNavDrawerActions();

  return (
    <ListItem>
      <ListItemButton component={Link} href={href} onClick={close}>
        <ListItemText>{children}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

interface NavCategoryItemsProps {
  categories?: Category[];
}

function NavCategoryItems({ categories = [] }: NavCategoryItemsProps) {
  if (!categories.length) return null;

  return (
    <>
      <Divider component="li" />
      {categories.map((category) => (
        <NavItem key={category.id} href={`/shop/category/${category.slug}`}>
          {category.name}
        </NavItem>
      ))}
    </>
  );
}
