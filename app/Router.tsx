import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Layout from '@Layout/index';

const Home = React.lazy(() => import('@pages/Home'));
const UploadHike = React.lazy(() => import('@pages/UploadHike'));
// [IMPORT NEW PAGE ABOVE] < Needed for generating containers seamlessly

const Router: React.FC = () => (
  <HashRouter basename="/">
    <Layout>
      <Switch>
        <Route path="/home" exact render={() => <Home />} />
        <Route path="/uploadHike" exact render={() => <UploadHike />} />
        {/* [INSERT NEW ROUTE ABOVE] < Needed for generating containers seamlessly */}
      </Switch>
    </Layout>
  </HashRouter>
);

export default hot(Router);
