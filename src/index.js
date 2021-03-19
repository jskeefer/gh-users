import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App';
import { ProvideApi } from './Api';

function Root() {
  const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  };
  const theme = extendTheme({ config });
  return (
    <ProvideApi>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </ProvideApi>
  );
}
ReactDOM.render(<Root />, document.getElementById('root'));
