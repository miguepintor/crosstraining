import React from 'react';

import { AuthUserContext, withAuthentication } from '../components/Session';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker } from '@material-ui/pickers';

import darkTheme from '../config/theme.dark.config';
import useStyles from '../config/theme.dashboard';

import Copyright from '../components/Copyright';

function Dashboard(props) {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const signOut = () => {
    props.firebase.auth.signOut()
    props.history.push("/");
  }

  return (
        <AuthUserContext.Consumer>
        {
        authUser => authUser ? (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" >
                  <Toolbar className={classes.toolbar}>
                      <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                      Crosstraining
                      </Typography>
                      <ThemeProvider theme={darkTheme}>
                        <Button onClick={signOut}>
                          Logout
                        </Button>
                      </ThemeProvider>
                  </Toolbar>
                </AppBar>
                <main className={classes.content }>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Choose your date"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                  <Box pt={4}>
                      <Copyright />
                  </Box>
                </Container>
                </main>
            </div>
            ) : (
            <p>Not authorized.</p>
         )
      }
    </AuthUserContext.Consumer>
  );
};

export default withRouter(withAuthentication(Dashboard));