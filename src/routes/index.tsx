import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Detail from '../pages/Detail';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={Dashboard} exact />
    <Route path="/detail/:pokemonId" component={Detail} />
  </Switch>
);

export default Routes;
