import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '~/store';
import { ThemeContext, theme } from '~/utils/hooks';
import App from './App';

render(
  <Provider store={store}>
    <ThemeContext.Provider value={theme}>
      <App />
    </ThemeContext.Provider>
  </Provider>,
  document.getElementById('root')
);
