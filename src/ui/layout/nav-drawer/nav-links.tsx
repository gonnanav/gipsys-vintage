import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Category } from '@/core/category';
import Divider from '@mui/material/Divider';

interface NavLinksProps {
  categories?: Category[];
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
  categories?: Category[];
  onClose: () => void;
}

function NavCategoryLinks({ categories = [], onClose }: NavCategoryLinksProps) {
  if (!categories.length) return null;

  return (
    <>
      <Divider component="li" />
      {categories.map((category) => (
        <NavCategoryLink key={category.id} category={category} onClose={onClose} />
      ))}
    </>
  );
}

interface NavCategoryLinkProps {
  category: Category;
  onClose: () => void;
}

function NavCategoryLink({ category, onClose }: NavCategoryLinkProps) {
  const { id, name, slug } = category;
  const href = `/shop/${slug}`;

  return (
    <NavLink key={id} href={href} onClose={onClose}>
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
