import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export interface CartCloseButtonProps {
  onClick: () => void;
}

export function CartCloseButton({ onClick }: CartCloseButtonProps) {
  return (
    <IconButton
      aria-label="סגרי את עגלת הקניות"
      onClick={onClick}
      data-testid="shopping-cart-close-button"
    >
      <CloseIcon />
    </IconButton>
  );
}
