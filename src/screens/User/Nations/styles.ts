import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 0,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  table: {
    minWidth: 300,
  },
  row: {
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.03)'
    }
  },
  ratingCell: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  updateButton: {
    marginBottom: 20,
    marginTop: 20,
  }
}));