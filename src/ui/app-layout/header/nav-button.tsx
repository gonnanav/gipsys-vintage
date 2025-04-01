import MenuIcon from '@mui/icons-material/Menu';
import { HeaderButton } from './header-button';

export interface NavButtonProps {
  onClick: () => void;
}

export function NavButton({ onClick }: NavButtonProps) {
  return <HeaderButton name="פתחי את תפריט הניווט" Icon={MenuIcon} onClick={onClick} />;
}
