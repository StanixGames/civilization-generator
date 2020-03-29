import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  layout: {
    width: '100%',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    width: 800,
    padding: theme.spacing(2),
    paddingTop: 0,
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
      paddingTop: 0,
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  stepFormWrapper: {
    marginTop: 20,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));
