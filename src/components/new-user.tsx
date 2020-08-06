import { FC, useCallback } from 'react';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';

interface INewUser {
  classes: ClassNameMap;
  setLoading: (loadingState: string) => void;
  setError: (errorState: string) => void;
  setSuccess: (successState: string) => void;
  loading: string;
}

export const NewUser: FC<INewUser> = ({
  classes,
  setError,
  setLoading,
  setSuccess,
  loading,
}) => {
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
      setError(err.message);
    } finally {
      setLoading(null);
    }
  }, []);

  return (
    <Grid item xs={6}>
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
  );
};
