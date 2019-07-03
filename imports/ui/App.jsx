import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import Layout from '../ui/router/layout';
import { withTracker } from "meteor/react-meteor-data";

const App = () => {
 
  return (
   
      <MuiThemeProvider theme={theme}>
          <CssBaseline />
            <BrowserRouter>
              <Layout />
            </BrowserRouter>
      </MuiThemeProvider>

  );
};


export default withTracker(() => {
  const user = Meteor.user();
	return {
		user
	};
})(App);