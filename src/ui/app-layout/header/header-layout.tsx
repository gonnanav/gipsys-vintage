import Stack from '@mui/material/Stack';

export function HeaderLayout({ children }: { children: React.ReactNode }) {
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
