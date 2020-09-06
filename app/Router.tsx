import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useToggleDarkMode from '@hooks/useToggleDarkMode';
import { hot } from 'react-hot-loader/root';
import Layout from '@Layout/index';

const Home = React.lazy(() => import('@pages/Home'));
const UploadHike = React.lazy(() => import('@pages/UploadHike'));
// [IMPORT NEW PAGE ABOVE] < Needed for generating containers seamlessly

const Router: React.FC = () => {
  const { isDarkMode } = useToggleDarkMode();
  const palletType = isDarkMode ? 'dark' : 'light';
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

  return (
    <HashRouter basename="/">
      <ThemeProvider theme={darkTheme}>
        <Layout>
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/uploadHike" exact render={() => <UploadHike />} />
            {/* [INSERT NEW ROUTE ABOVE] < Needed for generating containers seamlessly */}
          </Switch>
        </Layout>
      </ThemeProvider>
    </HashRouter>
  );
};

export default hot(Router);
