import React from 'react';
// import Hello from './components/Hello.jsx';
// import Info from './components/Info.jsx';
import Home from './pages/Home'
import Paperbase from './components/siteLayout/Paperbase.js';
//  import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';
import theme from './theme';
import Layout from '../ui/router/layout';
// import { ViewerProvider } from './context/ViewerProvider';
import { withTracker } from "meteor/react-meteor-data";

const App = () => {
  console.log('app rerendering');
  return (
   
      <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {/* <ViewerProvider> */}
            <BrowserRouter>
              <Layout />
            </BrowserRouter>
          {/* </ViewerProvider> */}
      </MuiThemeProvider>

  );
};

// export default App;
export default withTracker(() => {
  const user = Meteor.user();
	return {
		user
	};
})(App);