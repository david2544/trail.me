import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

const Home = React.lazy(() => import('@pages/Home'));
// [IMPORT NEW PAGE ABOVE] < Needed for generating containers seamlessly

const Router: React.FC = () => (
  <Switch>
    <Route render={() => <Home />} />
    {/* [INSERT NEW ROUTE ABOVE] < Needed for generating containers seamlessly */}
  </Switch>
);

export default hot(Router);
