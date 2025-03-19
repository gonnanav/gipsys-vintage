import { ButtonProps } from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

export interface SideDrawerLayoutProps {
  isOpen: boolean;
  title: string;
  closeButtonName: string;
  closeButtonProps?: ButtonProps & { 'data-testid'?: string };
  drawerProps?: DrawerProps & { 'data-testid'?: string };
  onClose: () => void;
  children: React.ReactNode;
}

export function SideDrawerLayout({
  isOpen,
  title,
  closeButtonName,
  closeButtonProps,
  drawerProps,
  onClose,
  children,
}: SideDrawerLayoutProps) {
  return (
    <Drawer
      role="dialog"
      aria-label={title}
      aria-modal="true"
      open={isOpen}
      onClose={onClose}
      {...drawerProps}
    >
      <Box sx={{ position: 'relative', px: 2, py: 1, width: { xs: '100vw', sm: '400px' } }}>
        <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
          <CloseButton {...closeButtonProps} closeButtonName={closeButtonName} onClick={onClose} />
        </Box>
        <Box sx={{ mt: 0.5 }}>
          <Title title={title} />
        </Box>
        {children}
      </Box>
    </Drawer>
  );
}

interface CloseButtonProps {
  closeButtonName: string;
  'data-testid'?: string;
  onClick: () => void;
}

function CloseButton({ closeButtonName, 'data-testid': dataTestId, onClick }: CloseButtonProps) {
  return (
    <IconButton aria-label={closeButtonName} onClick={onClick} data-testid={dataTestId}>
      <CloseIcon />
    </IconButton>
  );
}

interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  return (
    <Typography component="h2" variant="h6" sx={{ textAlign: 'center' }}>
      {title}
    </Typography>
  );
}
