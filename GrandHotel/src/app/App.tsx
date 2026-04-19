import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@figma/astraui';
import { LanguageProvider } from './context/LanguageContext';
import { router } from './routes';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </ThemeProvider>
  );
}