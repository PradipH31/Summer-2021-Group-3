import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SelectedListItem() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const people = ['Caleb', 'Anthony', 'Shane'];
  const partList = people.map((person, index) =>
  <div>
    <ListItem
      button
      selected={selectedIndex === index}
      onClick={(event) => handleListItemClick(event, index)}
    >
      <ListItemIcon>
        <Avatar alt={`${person}`} />
      </ListItemIcon>
      <ListItemText>
        {person}
      </ListItemText>
    </ListItem>
    <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {partList}
      </List>
    </div>
  );
}
