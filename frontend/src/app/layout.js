import '@fullcalendar/common/main.css';
import './globals.css';

export const metadata = {
  title: 'Frontend ISW',
  description: 'Template para proyectos de frontend en ISW',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
