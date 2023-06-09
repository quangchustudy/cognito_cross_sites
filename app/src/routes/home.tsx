import React, { useContext } from 'react'

import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import GitHubIcon from '@material-ui/icons/GitHub'
import Link from '@material-ui/core/Link'

import logoImage from './logo.png'

import { AuthContext } from '../contexts/authContext'
// @ts-ignore
import createGuest  from 'cross-domain-storage/guest'


// import localStorage from 'cross-domain-storage/host'

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    textAlign: 'center',
  },
  session: {
    width: '80vw',
    overflow: 'auto',
    overflowWrap: 'break-word',
    fontSize: '16px',
  },
  hero: {
    width: '100%',
    background: 'rgb(220,220,220)',
  },
}))

export default function Home() {
  const classes = useStyles()

  const history = useHistory()

  const auth = useContext(AuthContext)

  function signOutClicked() {
    var tokenStorage = createGuest('http://localhost:3000/accessStorage');
    Object.keys(localStorage).forEach(key => {
      console.log('key', key);
      tokenStorage.remove(key, localStorage[key])
    })
    tokenStorage.close();
    auth.signOut()
    history.push('/')
  }

  function changePasswordClicked() {
    history.push('changepassword')
  }

  return (
    <Grid container>
      <Grid className={classes.root} container direction="column" justify="center" alignItems="center">
        <Box className={classes.hero} p={4}>
          <Grid className={classes.root} container direction="column" justify="center" alignItems="center">
            <Box m={2}>
              <img src={logoImage} width={224} height={224} alt="logo" />
            </Box>
            <Box m={2}>
              <Link underline="none" color="inherit" href="https://github.com/dbroadhurst/aws-cognito-react">
                <Grid container direction="row" justify="center" alignItems="center">
                  <Box mr={3}>
                    <GitHubIcon fontSize="large" />
                  </Box>
                  <Typography className={classes.title} variant="h3">
                    AWS Cognito Starter Home FOR WEB 1
                  </Typography>
                </Grid>
              </Link>
            </Box>
            <Box m={2}>
              <Button onClick={signOutClicked} variant="contained" color="primary">
                Sign Out Web1
              </Button>
            </Box>
            <Box m={2}>
              <Button onClick={changePasswordClicked} variant="contained" color="primary">
                Change Password Web1
              </Button>
            </Box>
          </Grid>
        </Box>
        <Box m={2}>
          <Typography variant="h5">Session Info</Typography>
          <pre className={classes.session}>{JSON.stringify(auth.sessionInfo, null, 2)}</pre>
        </Box>
        <Box m={2}>
          <Typography variant="h5">User Attributes</Typography>
          <pre className={classes.session}>{JSON.stringify(auth.attrInfo, null, 2)}</pre>
        </Box>
      </Grid>
    </Grid>
  )
}
