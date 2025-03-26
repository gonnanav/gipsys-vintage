import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface RemoveCartItemButtonProps {
  onRemove: () => void;
}

export function RemoveCartItemButton({ onRemove }: RemoveCartItemButtonProps) {
  return (
    <IconButton aria-label="הסירי מסל הקניות" onClick={onRemove}>
      <HighlightOffIcon />
    </IconButton>
  );
}
