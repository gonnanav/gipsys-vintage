import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { SideDrawerLayout } from '../side-drawer-layout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Category } from '@/core/category';
import Divider from '@mui/material/Divider';

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
      <nav>
        <List aria-label="תפריט הניווט">
          <NavItem href="/" onClose={onClose}>
            עמוד הבית
          </NavItem>
          <NavItem href="/shop" onClose={onClose}>
            חנות
          </NavItem>
          <NavItem href="/policy" onClose={onClose}>
            תקנון האתר
          </NavItem>
          <NavCategoryItems categories={categories} onClose={onClose} />
        </List>
      </nav>
    </SideDrawerLayout>
  );
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  onClose: () => void;
}

function NavItem({ href, children, onClose }: NavItemProps) {
  return (
    <ListItem>
      <ListItemButton component={Link} href={href} onClick={onClose}>
        <ListItemText>{children}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

interface NavCategoryItemsProps {
  categories?: Category[];
  onClose: () => void;
}

function NavCategoryItems({ categories = [], onClose }: NavCategoryItemsProps) {
  if (!categories.length) return null;

  return (
    <>
      <Divider component="li" />
      {categories.map((category) => (
        <NavItem key={category.id} href={`/shop/${category.slug}`} onClose={onClose}>
          {category.name}
        </NavItem>
      ))}
    </>
  );
}
