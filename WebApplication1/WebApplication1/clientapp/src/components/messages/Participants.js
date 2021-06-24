import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../../css/participants.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto'
  },
}));

const Participants = () => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState();

  const people = ["Caleb", "Anthony", "Shane"];
  const [open, setOpen] = React.useState(false);
  const [userName, setName] = React.useState("abc");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const partList = people.map((person, index) =>
    <div>
      <ListItem
        button
        selected={selectedIndex === index}
        onClick={() => {
          setName(`${person}`)
          handleClickOpen()
        }}
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
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={'true'}
        maxWidth={'lg'}
      >
        <DialogTitle id="scroll-dialog-title" style={{ textAlign: 'center' }}>
          Conversations with {userName}
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {userName}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Participants