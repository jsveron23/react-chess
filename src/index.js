import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '~/store';
import { ThemeProvider, theme } from '~/hooks';
import { App } from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ThemeProvider value={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
