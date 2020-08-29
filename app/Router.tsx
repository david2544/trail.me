import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Layout from '@Layout/index';

const Home = React.lazy(() => import('@pages/Home'));
// [IMPORT NEW PAGE ABOVE] < Needed for generating containers seamlessly

const Router: React.FC = () => (
  <Switch>
    <Layout>
      <Route render={() => <Home />} />
      {/* [INSERT NEW ROUTE ABOVE] < Needed for generating containers seamlessly */}
    </Layout>
  </Switch>
);

export default hot(Router);
