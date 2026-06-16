import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Fonts
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/cinzel/400.css';
import '@fontsource/cinzel/600.css';

// Styles
import './styles/globals.css';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
