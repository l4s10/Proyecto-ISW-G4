'use client';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';

import theme from '@/themes/theme';

export default function MyComponent() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained">Hello World</Button>
      <Button variant="contained">Que pasa chaval</Button>
    </ThemeProvider>
  );
}
