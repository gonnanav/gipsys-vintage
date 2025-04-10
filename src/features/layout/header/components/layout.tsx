import Stack from '@mui/material/Stack';

interface HeaderLayoutProps {
  children: React.ReactNode;
}

export function HeaderLayout({ children }: HeaderLayoutProps) {
  return (
    <Stack
      component="header"
      direction="row"
      spacing={{ xs: 2, sm: 3 }}
      sx={{ height: { xs: 60, sm: 80, md: 100 }, alignItems: 'center', px: { xs: 2, sm: 3 } }}
    >
      {children}
    </Stack>
  );
}
