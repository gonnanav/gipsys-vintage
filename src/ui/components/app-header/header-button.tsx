import IconButton from '@mui/material/IconButton';
import { SvgIconProps } from '@mui/material/SvgIcon';

export interface HeaderButtonProps {
  testId: string;
  ariaLabel: string;
  Icon: React.ComponentType<SvgIconProps>;
  onClick: () => void;
}

export function HeaderButton({ testId, ariaLabel, Icon, onClick }: HeaderButtonProps) {
  return (
    <IconButton data-testid={testId} aria-label={ariaLabel} onClick={onClick}>
      <Icon sx={{ color: 'primary.main' }} />
    </IconButton>
  );
}
