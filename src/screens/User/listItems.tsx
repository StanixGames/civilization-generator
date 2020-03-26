import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AddCircle from '@material-ui/icons/AddCircle';
import {Link} from 'react-router-dom';

export const mainListItems = (
  <div>
    <Link to="/home">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link to="/players">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Players" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Options</ListSubheader>
    <Link to="/draft">
      <ListItem button>
        <ListItemIcon>
          <AddCircle />
        </ListItemIcon>
        <ListItemText primary="New draft" />
      </ListItem>
    </Link>
  </div>
);