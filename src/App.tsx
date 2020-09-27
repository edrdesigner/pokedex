import React from 'react';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <ConfigProvider locale={ptBR}>
      <GlobalStyle />
      <Header />
      <Routes />
    </ConfigProvider>
  </Router>
);

export default App;
