import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  infoCard: {
    maxWidth: 300,
    minWidth: 300,
    margin: 0,
  },
  infoSkeleton: {
    width: 300,
    height: 300,
    margin: 0,
  },
  infoContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoTitle: {
    marginTop: 10,
  },
  avatar: {
    width: 120,
    height: 120,
  },
}));