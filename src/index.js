import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '~/store';
import { ThemeProvider, theme } from '~/hooks';
import App from './App';

render(
  <Provider store={store}>
    <ThemeProvider value={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
