import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { HeaderButton } from './header-button';

export interface CartButtonProps {
  onClick: () => void;
}

export function CartButton({ onClick }: CartButtonProps) {
  return <HeaderButton name="פתחי את סל הקניות" Icon={ShoppingCartIcon} onClick={onClick} />;
}
