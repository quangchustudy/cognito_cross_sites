import React, { useEffect } from 'react'
import './App.css'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import AuthProvider, { AuthIsSignedIn, AuthIsNotSignedIn } from './contexts/authContext'

import ChangePassword from './routes/auth/changePassword'
import Landing from './routes/landing'

// @ts-ignore
import createHost from "cross-domain-storage/host";

let lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
})
lightTheme = responsiveFontSizes(lightTheme)

// let darkTheme = createMuiTheme({
//   palette: {
//     type: 'dark',
//   },
// })
// darkTheme = responsiveFontSizes(darkTheme)

const SignInRoute: React.FunctionComponent = () => (
  <Router>
    <Switch>
      <Route path="/" component={Landing} />
    </Switch>
  </Router>
)

const MainRoute: React.FunctionComponent = () => (
  <Router>
    <Switch>
      <Route path="/changepassword" component={ChangePassword} />
      <Route path="/" component={ChangePassword} />
    </Switch>
  </Router>
)

const App: React.FunctionComponent = () => {
  useEffect(() => {
    createHost([
      {
        origin: "http://localhost:4000",
        allowedMethods: ["set", "remove"],
      },
    ]);
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AuthProvider>
        <AuthIsSignedIn>
          <MainRoute />
        </AuthIsSignedIn>
        <AuthIsNotSignedIn>
          <SignInRoute />
        </AuthIsNotSignedIn>
      </AuthProvider>
    </ThemeProvider>
  ) 
}

export default App
