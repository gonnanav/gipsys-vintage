import IconButton from '@mui/material/IconButton';
import { SvgIconProps } from '@mui/material/SvgIcon';

export interface HeaderButtonProps {
  ariaLabel: string;
  Icon: React.ComponentType<SvgIconProps>;
  onClick: () => void;
}

export function HeaderButton({ ariaLabel, Icon, onClick }: HeaderButtonProps) {
  return (
    <IconButton aria-label={ariaLabel} onClick={onClick}>
      <Icon sx={{ color: 'primary.main' }} />
    </IconButton>
  );
}
