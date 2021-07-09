import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { CircularProgress } from '@material-ui/core';
import { Link } from "react-router-dom";

const StudentCourseList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://localhost:44377/api/Class")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  let itemList;

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div>
        <CircularProgress size={'30%'}/>
      </div>
    );
  } else {
    itemList = items.map((item,) => {
      return (
        <div style={{ padding: "1%" }} key={item.classId}>
          <Link to={`/classes/${item.classId}`}>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {item.className.split('')[0]}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={item.className}
                subheader={item.classOwner}
              />
              <CardMedia
                className={classes.media}
                image={item.imageSrc}
                title={item.className}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.classDescription}
                </Typography>
              </CardContent>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
              </Collapse>
            </Card>
          </Link>
        </div>
      )
    })
    return (
      <div>
        <nav>
          <ul style={{
            marginBlockEnd: 'unset',
            marginBlockStart: 'unset',
            paddingInlineStart: 'unset',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            {itemList}
          </ul>
        </nav>
      </div>
    );
  }
}

export default StudentCourseList