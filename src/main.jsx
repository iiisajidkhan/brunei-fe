import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.jsx';

// SWR Config Provider
import SWRProvider from './services/SWRProvider';

import { Toaster } from '@/components/ui/sonner';

createRoot(document.getElementById('root')).render(
  <SWRProvider>
    <App />
    <Toaster />
  </SWRProvider>,
);
