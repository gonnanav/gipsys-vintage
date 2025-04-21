import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { NavCategory } from '@/components/layout';

interface NavLinksProps {
  categories?: NavCategory[];
  onClose: () => void;
}

export function NavLinks({ categories, onClose }: NavLinksProps) {
  return (
    <nav>
      <List aria-label="תפריט הניווט">
        <NavLink href="/" onClose={onClose}>
          עמוד הבית
        </NavLink>
        <NavLink href="/shop" onClose={onClose}>
          חנות
        </NavLink>
        <NavLink href="/policy" onClose={onClose}>
          תקנון האתר
        </NavLink>
        <NavCategoryLinks categories={categories} onClose={onClose} />
      </List>
    </nav>
  );
}

interface NavCategoryLinksProps {
  categories?: NavCategory[];
  onClose: () => void;
}

function NavCategoryLinks({ categories = [], onClose }: NavCategoryLinksProps) {
  if (!categories.length) return null;

  return (
    <>
      <Divider component="li" />
      {categories.map(({ id, name, href }) => (
        <NavCategoryLink key={id} name={name} href={href} onClose={onClose} />
      ))}
    </>
  );
}

interface NavCategoryLinkProps {
  name: string;
  href: string;
  onClose: () => void;
}

function NavCategoryLink({ name, href, onClose }: NavCategoryLinkProps) {
  return (
    <NavLink href={href} onClose={onClose}>
      {name}
    </NavLink>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClose: () => void;
}

function NavLink({ href, children, onClose }: NavLinkProps) {
  return (
    <ListItem>
      <ListItemButton component={Link} href={href} onClick={onClose}>
        <ListItemText>{children}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
