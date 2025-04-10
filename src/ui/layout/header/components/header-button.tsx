import IconButton from '@mui/material/IconButton';
import { SvgIconProps } from '@mui/material/SvgIcon';

export interface HeaderButtonProps {
  name: string;
  Icon: React.ComponentType<SvgIconProps>;
  onClick: () => void;
}

export function HeaderButton({ name, Icon, onClick }: HeaderButtonProps) {
  return (
    <IconButton aria-label={name} onClick={onClick}>
      <Icon sx={{ color: 'primary.main' }} />
    </IconButton>
  );
}
