import React, { useCallback, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FitnessCenter from '@material-ui/icons/FitnessCenter';
import Container from '@material-ui/core/Container';
import { Copyright } from '../src/copyright';
import Paper from '@material-ui/core/Paper';

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
  console.log('SignIn -> error', error);

  const submitNewUser = useCallback(async (e) => {
    try {
      e.preventDefault();
      setLoading('new-user');
      const fd = new FormData(e.target as HTMLFormElement);
      const res = await fetch('/api/exercise/new-user', {
        method: 'POST',
        body: fd,
      });
      const result = await res.json();
      if (result.error) {
        throw new Error(result.error);
      }
      setSuccess('new-user');
    } catch (err) {
      console.log('submitNewUser -> err', err);
      setError(err.message);
    } finally {
      setLoading(null);
    }
  }, []);

  const handleCloseErrorSnackbar = useCallback(() => {
    setError(null);
  }, []);

  const handleCloseSuccessSnackbar = useCallback(() => {
    setSuccess(null);
  }, []);

  return (
    <Container component="main">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create a user
            </Typography>
            <form className={classes.form} noValidate onSubmit={submitNewUser}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading === 'new-user'}
              >
                Create
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <FitnessCenter />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add exercises
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="duration"
                label="Duration (mins)"
                name="duration"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="date"
                id="date"
                label="Date"
                name="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
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
