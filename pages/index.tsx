import React, { useCallback, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Copyright } from '../src/components/copyright';
import { NewUser } from '../src/components/new-user';
import { NewExercise } from '../src/components/new-exercise';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleCloseErrorSnackbar = useCallback(() => {
    setError(null);
  }, []);

  const handleCloseSuccessSnackbar = useCallback(() => {
    setSuccess(null);
  }, []);

  return (
    <Container component="main">
      <Grid container spacing={2}>
        <NewUser
          classes={classes}
          setLoading={setLoading}
          setError={setError}
          setSuccess={setSuccess}
          loading={loading}
        />
        <NewExercise
          classes={classes}
          setLoading={setLoading}
          setError={setError}
          setSuccess={setSuccess}
          loading={loading}
        />
      </Grid>
      <div className={classes.paper}></div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackbar}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert onClose={handleCloseErrorSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={success !== null}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackbar}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert onClose={handleCloseSuccessSnackbar} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
}
