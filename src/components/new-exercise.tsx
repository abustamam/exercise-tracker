import React, { FC, useCallback } from 'react';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { FitnessCenter } from '@material-ui/icons';

interface INewExercise {
  classes: ClassNameMap;
  setLoading: (loadingState: string) => void;
  setError: (errorState: string) => void;
  setSuccess: (successState: string) => void;
  loading: string;
}

export const NewExercise: FC<INewExercise> = ({
  classes,
  setError,
  setLoading,
  setSuccess,
  loading,
}) => {
  const submitNewExercise = useCallback(async (e) => {
    try {
      e.preventDefault();
      setLoading('new-exercise');
      const fd = new FormData(e.target as HTMLFormElement);
      const res = await fetch('/api/exercise/add', {
        method: 'POST',
        body: fd,
      });
      const result = await res.json();
      if (result.error) {
        throw new Error(result.error);
      }
      setSuccess('new-exercise');
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
          <FitnessCenter />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add exercises
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitNewExercise}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userId"
            label="User ID"
            name="userId"
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
            disabled={loading === 'new-exercise'}
          >
            Create
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
